import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import LookupsService from './lookupsService';
import CustomerService from '../customer/customerService';

const router = express.Router();

router.use(authMiddleware);

router.post('/GetPaymentMethods', async (req, res, next) => {

    try {
        
        const lookupsService = new LookupsService();
        const listReturn = lookupsService.getPaymentMethods();

        return res.send({
            paymentMethods: listReturn
           });

    } catch(error) {
        next(error);
        return;
    }
});

router.get('/GetCustomers', async (_req, res, next) => {

    try {
        const service = new CustomerService();
        const customersList = await service.getAll();

        return res.send({ customers: customersList });
        
    } catch(error) {
        next(error);
        return;
    }
});


router.use(errorMiddleware);

export default router;