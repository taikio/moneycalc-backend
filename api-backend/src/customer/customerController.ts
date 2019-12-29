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
            name: req.body.Name,
            shortName: req.body.ShortName,
            cpf: req.body.Cpf,
            email: req.body.Email
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

        return res.send({ customers: customersList });
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/email', validationMiddleware(EmailValidationSchema), async (req, res, next) => {

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

router.put('/name', validationMiddleware(NameValidationSchema), async (req, res, next) => {

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

router.put('/shortName', validationMiddleware(ShortNameValidationSchema), async (req, res, next) => {

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

router.put('/cpf', validationMiddleware(CpfValidationSchema), async (req, res, next) => {

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