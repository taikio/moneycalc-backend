import express from 'express';
import bodyParser from 'body-parser';
import userController from './user/userController';
import customerController from './customer/customerController';
import serviceOrderController from './serviceOrder/serviceOrderController';
import lookupsController from './lookups/lookupsController';
import billController from './bill/billController';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ============ Rotas ===============
app.use('/user', userController);
app.use('/customer', customerController);
app.use('/serviceOrder', serviceOrderController);
app.use('/lookups', lookupsController);
app.use('/bill', billController);

// ==================================
app.get('/', (_, res) => {
    res.send("Hello ts-node!");
});

export default app;

