import { CustomError } from './utils/customError';
import express from 'express';
import bodyParser from 'body-parser';
import userController from './user/userController';

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);

app.get('/', (_, res) => {
    res.send("Hello ts-node!");
});

app.get('/exception', (_, res) => {

    try {
        throw new CustomError('Teste de erro customizado', 500, true);
    }
    catch(error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).send({ error: error.message });
        }
        return res.status(400).send("erro genérico");
    }

    res.send("Ok");
})

export default app;

