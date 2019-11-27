import express from 'express';
import User, { IUser }  from './user';

const router = express.Router();

router.post('/register', async (req, res) => {
    const email  = req.body.email;

    if (await User.findOne({ email })) {
        return res.status(400).send({ error : 'Usuário já cadastrado!'});
    }

    try {
        const user: IUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });
    
        await User.create(user);

        return res.send({ user });

    } catch (error) {
        return res.status(400).send({ error: 'Falha ao cadastrar usuário!'});
    }
});

export default router;
