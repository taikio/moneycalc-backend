import express from 'express';
import Customer, { ICustomer } from './customer';
import CustomerService from './customerService';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res, next) => {
    
    try {
        const newCustomer: ICustomer = new Customer({
            name: req.body.name,
            shortName: req.body.shortName,
            cpf: req.body.cpf,
        });

        const customerService = new CustomerService();
    
        const customer = await customerService.newCustomer(newCustomer);

        return res.send({
             customer
            });

    } catch (error) {
        next(error);
        return;
    }
});

router.get('/', async (_req, res, next) => {

    try {
        const customerService = new CustomerService();
        const customersList = await customerService.getAll();

        return res.send({ customers: customersList });
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/email', async (req, res, next) => {

    try {
        const customerId = req.body.Id;
        const email = req.body.Email;
        console.log('customer id', customerId);
        console.log('customer email', email);

        const customerService = new CustomerService();
        await customerService.changeCustomerEmail(customerId, email);

        res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/name', async (req, res, next) => {

    try {
        const customerId = req.body.Id;
        const name = req.body.Name;
        console.log('customer id', customerId);
        console.log('customer email', name);

        const customerService = new CustomerService();
        await customerService.changeCustomerName(customerId, name);

        res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/shortName', async (req, res, next) => {

    try {
        const customerId = req.body.Id;
        const name = req.body.ShortName;
        console.log('customer id', customerId);
        console.log('customer email', name);

        const customerService = new CustomerService();
        await customerService.changeCustomerShortName(customerId, name);

        res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/cpf', async (req, res, next) => {

    try {
        const customerId = req.body.Id;
        const cpf = req.body.Cpf;
        console.log('customer id', customerId);
        console.log('customer email', cpf);

        const customerService = new CustomerService();
        await customerService.changeCustomerCpf(customerId, cpf);

        res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }

});

router.post('/cancel', async (req, res, next) => {

    try {
        const customerId = req.params.Id;
        
        const customerService = new CustomerService();
        await customerService.delete(customerId);

        res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
})

router.use(errorMiddleware);

export default router;