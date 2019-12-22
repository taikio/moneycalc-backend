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

router.get('/GetByDate', async (req, res, next) => {

    try {
        const { startDate, endDate } = req.query;

        const serviceOrderService = new ServiceOrderService();

        const serviceOrderList = await serviceOrderService.GetServiceOrdersByDate(startDate, endDate);

        return res.send({ serviceOrders: serviceOrderList });
    } catch(error) {
        next(error);
        return;
    }
});

router.post('/Cancel:id', async (req, res, next) => {

    try {
        const id = req.params.id;

        const serviceOrderService = new ServiceOrderService();
        await serviceOrderService.CancelServiceOrder(id);

        return res.send('ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Customer', async (req, res, next) => {

    try {
        const { CustomerId, ServiceOrderId } = req.body;

        const serviceOrderService = new ServiceOrderService();
        await serviceOrderService.changeCustomer(ServiceOrderId, CustomerId);

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Description', async (req, res, next) => {

    try {
        const { ServiceOrderId, Description } = req.body;

        const serviceOrderService = new ServiceOrderService();
        await serviceOrderService.changeDescription(ServiceOrderId, Description);

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});


router.use(errorMiddleware);

export default router;