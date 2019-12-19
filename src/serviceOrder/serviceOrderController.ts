import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import ServiceOrder, { IServiceOrder } from './serviceOrder';
import ServiceOrderService from './serviceOrderService';
import errorMiddleware from '../middleware/errorMiddleware';
import InputBillDto from '../bill/inputBillDto';
import BillService from '../bill/billService';
import SystemConstants from '../utils/systemConstants';

const router = express.Router();

router.use(authMiddleware);

router.post('/New', async (req, res, next) => {

    try {

        const bill: InputBillDto = {
            Description: req.body.Description,
            PaymentMethodSysId: req.body.PaymentMethodSysId,
            Value: req.body.Value,
            DueDate: req.body.DueDate
        };

        const billService = new BillService();
        const savedBill = await billService.newBill(bill, SystemConstants.BillDestinyReceive);

        const newServiceOrder: IServiceOrder = new ServiceOrder({
            description: req.body.Description,
            customer: req.body.CustomerId,
            bill: savedBill.id
        });

        const serviceOrderService = new ServiceOrderService();        
        await serviceOrderService.newServiceOrder(newServiceOrder);

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.get('/GetList', async (_req, res, next) => {

    try {
        const service = new ServiceOrderService();
        const serviceOrderList = await service.getAll();

        return res.send({ serviceOrders: serviceOrderList });
    } catch(error) {
        next(error);
        return;
    }
});


router.use(errorMiddleware);

export default router;