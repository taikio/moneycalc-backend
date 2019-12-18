import User, { IUser } from "./user";
import CustomError from '../utils/customError';
import bcrypt from 'bcryptjs';
import SvcUtils from '../utils/utilsService';

export default class UserService {

    constructor() {}

    public async register(newUser: IUser): Promise<IUser> {

        if (await User.findOne({ email: newUser.email })) {
            throw new CustomError('Usuário já cadastrado!', 400, true);
        }
    
        try {
            const user: IUser = new User({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                isAdmin: newUser.isAdmin
            });
        
            await User.create(user);
    
            delete user.password;
    
            return user;
    
        } catch (error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async authenticate(email: string, password: string): Promise<string> {

        try {
            /**
             * Utiliza-se .select('+propriedade') para trazer na consulta uma propriedade
             * configurada como 'select: false' na definição do Model
             */
            const user = await User.findOne({ email }).select('+password');
            console.log(user);
            if (!user)
                throw new CustomError('Usuário não encontrado!', 400, true);

            if (! await bcrypt.compare(password, user.password))
                throw new CustomError('Senha inválida!', 400, true);

            delete user.password;

            return SvcUtils.generateToken(user.id);
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async resetPassword(email: string, currentUserId: number) {

        const loggedUser = await User.findById(currentUserId);
        
        if (loggedUser === null || !loggedUser.isAdmin)
            throw new  CustomError('Você não tem permissão para executar esta ação', 401, true);

        try {
            const hash = await bcrypt.hash('102030', 10);
            await User.updateOne({ email }, { password: hash });
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
        
    }
}