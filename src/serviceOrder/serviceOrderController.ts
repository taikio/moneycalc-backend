import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import ServiceOrder, { IServiceOrder } from './serviceOrder';
import ServiceOrderService from './serviceOrderService';
import errorMiddleware from '../middleware/errorMiddleware';
import InputBillDto from '../bill/inputBillDto';
import BillService from '../bill/billService';
import SystemConstants from '../utils/systemConstants';
import validationMiddleware from '../middleware/validationMiddleware';
import NewServideOrderValidationSchema from './validators/newServiceOrderValidationSchema';
import ServiceOrderCustomerValidationSchema from './validators/serviceOrderCustomerValidationSchema';
import ServiceOrderDescriptionValidationSchema from './validators/serviceOrderDescriptionValidationSchema';

const router = express.Router();

router.use(authMiddleware);

router.post('/New', validationMiddleware(NewServideOrderValidationSchema), async (req, res, next) => {

    try {

        const bill: InputBillDto = {
            Description: req.body.description,
            PaymentMethodSysId: req.body.paymentMethodSysId,
            Value: req.body.value,
            DueDate: req.body.dueDate
        };

        const billService = new BillService();
        const savedBill = await billService.newBill(bill, SystemConstants.BillDestinyReceive);

        const newServiceOrder: IServiceOrder = new ServiceOrder({
            description: req.body.description,
            customer: req.body.customerId,
            bill: savedBill.id
        });

        const serviceOrderService = new ServiceOrderService();        
        await serviceOrderService.newServiceOrder(newServiceOrder);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.get('/GetList', async (_req, res, next) => {

    try {
        const service = new ServiceOrderService();
        const serviceOrderList = await service.getAll();

        return res.send(serviceOrderList);
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

        return res.send(serviceOrderList);
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

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Customer', validationMiddleware(ServiceOrderCustomerValidationSchema), async (req, res, next) => {

    try {
        const { customerId, id } = req.body;

        const serviceOrderService = new ServiceOrderService();
        await serviceOrderService.changeCustomer(id, customerId);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Description', validationMiddleware(ServiceOrderDescriptionValidationSchema), async (req, res, next) => {

    try {
        const { id, description } = req.body;

        const serviceOrderService = new ServiceOrderService();
        await serviceOrderService.changeDescription(id, description);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});


router.use(errorMiddleware);

export default router;