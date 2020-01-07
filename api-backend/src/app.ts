import express from 'express';
import bodyParser from 'body-parser';
import userController from './user/userController';
import customerController from './customer/customerController';
import serviceOrderController from './serviceOrder/serviceOrderController';
import lookupsController from './lookups/lookupsController';
import billController from './bill/billController';
import path from 'path';
import ejs from 'ejs';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));
app.use(cors());

/* Habilitando cross origin */
// app.all('*', function(_req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// ============ Rotas ===============
app.use('/users', userController);
app.use('/api/customers', customerController);
app.use('/api/serviceOrders', serviceOrderController);
app.use('/api/lookups', lookupsController);
app.use('/api/bills', billController);

// ==================================
app.get('/', (_, res) => {
    res.render('index');
});

app.get('/auth/sign', (_, res) => {
    res.render('index');
});

app.get('/dashboard', (_, res) => {
    res.render('index');
});

export default app;

