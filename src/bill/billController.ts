import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
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

router.get('/', async (_req, res, next) => {

    try {
        const billService = new BillService();
        const billsList = await billService.getAll();

        return res.send ({ billsList });
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

        res.send({ billsList });
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/PaymentMethod', async (req, res, next) => {

    try {
        const { Id, PaymentMethodSysId } = req.body;

        const billService = new BillService();

        await billService.updatePaymentMethod(Id, PaymentMethodSysId);

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/DueDate', async (req, res, next) => {

    try {
        const { Id, DueDate } = req.body;

        const billService = new BillService();

        const dateArray = DueDate.split('-');


        const newDueDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        console.log('dueDate', newDueDate.getVarDate);
        await billService.updateDueDate(Id, newDueDate);

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.put('/Value', async (req, res, next) => {

    try {
        const { Id, Value } = req.body;

        const billService = new BillService();

        await billService.updateValue(Id, Value);

        return res.send('Ok');
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

        return res.send('Ok');
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

        return res.send({ accountBalance });
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

        return res.send('Ok');
    } catch(error) {
        next(error);
        return;
    }
});

router.use(errorMiddleware);

export default router;