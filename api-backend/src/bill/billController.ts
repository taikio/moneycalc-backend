import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import InputBillDto from './inputBillDto';
import BillService from './billService';
import SystemConstants from '../utils/systemConstants';
import ValidationMiddleware from '../middleware/validationMiddleware';
import NewBillValidationSchema from './validators/newBillValidationSchema';
import DueDateValidationSchema from './validators/dueDateValidationSchema';
import PaymentMethodValidationSchema from './validators/paymentMethodValidationSchema';
import ValueValidationSchema from './validators/valueValidationSchema';

const router = express.Router();

router.use(authMiddleware);

router.post('/NewPayable', ValidationMiddleware(NewBillValidationSchema), async (req, res, next) => {

    try {
        
        let inputBillDto: InputBillDto = {
            PaymentMethodSysId: req.body.paymentMethodSysId,
            Description: req.body.description,
            Value: req.body.value,
            DueDate: req.body.dueDate
        };

        const billService = new BillService();

        await billService.newBill(inputBillDto, SystemConstants.BillDestinyPay);
        

        return res.status(200).send();

    } catch(error) {
        next(error);
        return;
    }
});

router.post('/NewReceivable', ValidationMiddleware(NewBillValidationSchema), async (req, res, next) => {

    try {
        
        let inputBillDto: InputBillDto = {
            PaymentMethodSysId: req.body.paymentMethodSysId,
            Description: req.body.description,
            Value: req.body.value,
            DueDate: req.body.dueDate
        };

        const billService = new BillService();

        await billService.newBill(inputBillDto, SystemConstants.BillDestinyReceive);
        

        return res.status(200).send();

    } catch(error) {
        next(error);
        return;
    }
});

router.get('/', async (_req, res, next) => {

    try {
        const billService = new BillService();
        const billsList = await billService.getAll();

        return res.send (billsList);
    } catch(error) {
        next(error);
        return;
    }
});

router.get('/GetByDate', async (req, res, next) => {

    try {
        const { startDate, endDate, destiny } = req.query;

        const billService = new BillService();

        const billsList = await billService.getBillsByDate(startDate, endDate, destiny);

        res.send(billsList);
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/PaymentMethod', ValidationMiddleware(PaymentMethodValidationSchema), async (req, res, next) => {

    try {
        const { id, paymentMethodSysId } = req.body;

        const billService = new BillService();

        await billService.updatePaymentMethod(id, paymentMethodSysId);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/DueDate', ValidationMiddleware(DueDateValidationSchema), async (req, res, next) => {

    try {
        const { id, dueDate } = req.body;

        const billService = new BillService();

        const dateArray = dueDate.split('-');


        const newDueDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        console.log('dueDate', newDueDate.getVarDate);
        await billService.updateDueDate(id, newDueDate);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Value', ValidationMiddleware(ValueValidationSchema), async (req, res, next) => {

    try {
        const { id, value } = req.body;

        const billService = new BillService();

        await billService.updateValue(id, value);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.post('/Cancel/:id', async (req, res, next) => {

    try {
        const id = req.params.id;

        const billService = new BillService();
        await billService.cancel(id);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.get('/AccountBalance', async (req, res, next) => {

    try {

        const { startDate, endDate} = req.query;

        const billService = new BillService();

        const accountBalance = await billService.getAccountBalance(startDate, endDate);

        return res.send(accountBalance);
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/MakeRetirement/:id', async (req, res, next) => {

    try {
        const id = req.params.id;

        const billService = new BillService();
        await billService.MakeRetirement(id);

        return res.status(200).send();
    } catch(error) {
        next(error);
        return;
    }
});

router.use(errorMiddleware);

export default router;