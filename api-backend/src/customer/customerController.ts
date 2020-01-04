import express from 'express';
import Customer, { ICustomer } from './customer';
import CustomerService from './customerService';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import validationMiddleware from '../middleware/validationMiddleware';
import NewCustomerValidationSchema from './validators/newCustomerValidationSchema';
import EmailValidationSchema from './validators/emailValidationSchema';
import NameValidationSchema from './validators/nameValidationSchema';
import ShortNameValidationSchema from './validators/shortNameValidationSchema';
import CpfValidationSchema from './validators/cpfValidationSchema';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validationMiddleware(NewCustomerValidationSchema), async (req, res, next) => {
    
    try {
        const newCustomer: ICustomer = new Customer({
            name: req.body.name,
            shortName: req.body.shortName,
            cpf: req.body.cpf,
            email: req.body.email
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

router.get('/GetList', async (_req, res, next) => {

    try {
        const customerService = new CustomerService();
        const customersList = await customerService.getAll();

        return res.send(customersList);
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/email', validationMiddleware(EmailValidationSchema), async (req, res, next) => {

    try {
        const customerId = req.body.id;
        const email = req.body.email;
        console.log('customer id', customerId);
        console.log('customer email', email);

        const customerService = new CustomerService();
        await customerService.changeCustomerEmail(customerId, email);

        res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/name', validationMiddleware(NameValidationSchema), async (req, res, next) => {

    try {
        const customerId = req.body.id;
        const name = req.body.name;
        console.log('customer id', customerId);
        console.log('customer email', name);

        const customerService = new CustomerService();
        await customerService.changeCustomerName(customerId, name);

        res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/shortName', validationMiddleware(ShortNameValidationSchema), async (req, res, next) => {

    try {
        const customerId = req.body.id;
        const name = req.body.shortName;
        console.log('customer id', customerId);
        console.log('customer email', name);

        const customerService = new CustomerService();
        await customerService.changeCustomerShortName(customerId, name);

        res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }

});

router.put('/cpf', validationMiddleware(CpfValidationSchema), async (req, res, next) => {

    try {
        const customerId = req.body.id;
        const cpf = req.body.cpf;
        console.log('customer id', customerId);
        console.log('customer email', cpf);

        const customerService = new CustomerService();
        await customerService.changeCustomerCpf(customerId, cpf);

        res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }

});

router.post('/cancel', async (req, res, next) => {

    try {
        const customerId = req.params.id;
        
        const customerService = new CustomerService();
        await customerService.delete(customerId);

        res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
})

router.use(errorMiddleware);

export default router;