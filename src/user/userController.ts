import express from 'express';
import User, { IUser }  from './user';
import SvcUtils from '../utils/utilsService';
import UserService from './userService';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';


const router = express.Router();

router.post('/register', async (req, res, next) => {
    
    try {
        const newUser: IUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });

        const userService = new UserService();
    
        const user = await userService.register(newUser);

        return res.send({
             user,
             token: SvcUtils.generateToken(user.id)
            });

    } catch (error) {
        next(error);
        return;
    }
});

router.post('/token', async (req, res, next) => {

    const { email, password } = req.body;

    const userService = new UserService();
    try {
        const userToken = await userService.authenticate(email, password);

        return res.send({ token: userToken });
    } catch(error) {
        next(error);
        return;
    }
});

router.post('/resetPassword', authMiddleware, async (req: any, res, next) => {

    const { email } = req.body;

    const userService = new UserService();
    try {
        await userService.resetPassword(email, req.userId);

        return res.send("Ok");
    } catch(error) {
        next(error);
        return;
    }
});

router.use(errorMiddleware);

export default router;
