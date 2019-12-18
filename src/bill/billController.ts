import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import CustomerService from '../customer/customerService';
import InputBillDto from './inputBillDto';
import BillService from './billService';
import SystemConstants from '../utils/systemConstants';

const router = express.Router();

router.use(authMiddleware);

router.post('/NewPayable', async (req, res, next) => {

    try {
        
        let inputBillDto: InputBillDto = {
            PaymentMethodSysId: req.body.PaymentMethodSysId,
            Description: req.body.Description,
            Value: req.body.Value,
            DueDate: req.body.DueDate
        };

        const billService = new BillService();

        await billService.newBill(inputBillDto, SystemConstants.BillDestinyPay);
        

        return res.send('Ok');

    } catch(error) {
        next(error);
        return;
    }
});

router.post('/NewReceivable', async (req, res, next) => {

    try {
        
        let inputBillDto: InputBillDto = {
            PaymentMethodSysId: req.body.PaymentMethodSysId,
            Description: req.body.Description,
            Value: req.body.Value,
            DueDate: req.body.DueDate
        };

        const billService = new BillService();

        await billService.newBill(inputBillDto, SystemConstants.BillDestinyReceive);
        

        return res.send('Ok');

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