import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import ServiceOrder, { IServiceOrder } from './serviceOrder';
import ServiceOrderService from './serviceOrderService';
import errorMiddleware from '../middleware/errorMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res, next) => {

    try {
        const newServiceOrder: IServiceOrder = new ServiceOrder({
            description: req.body.description,
            customer: req.body.customerId
        });

        const serviceOrderService = new ServiceOrderService();
        
        const serviceOrder = await serviceOrderService.newServiceOrder(newServiceOrder);

        return res.send({
            serviceOrder
           });
    } catch(error) {
        next(error);
        return;
    }
});

router.get('/', async (_req, res, next) => {

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