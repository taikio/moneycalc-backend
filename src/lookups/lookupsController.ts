import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import LookupsService from './lookupsService';
import CustomerService from '../customer/customerService';

const router = express.Router();

router.use(authMiddleware);

router.get('/GetPaymentMethods', async (_req, res, next) => {

    try {
        
        const lookupsService = new LookupsService();
        const listReturn = lookupsService.getPaymentMethods();

        return res.send(listReturn);

    } catch(error) {
        next(error);
        return;
    }
});

router.get('/GetCustomers', async (_req, res, next) => {

    try {
        const service = new CustomerService();
        const customersList = await service.getAll();

        return res.send(customersList);
        
    } catch(error) {
        next(error);
        return;
    }
});


router.use(errorMiddleware);

export default router;