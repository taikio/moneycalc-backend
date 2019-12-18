import ServiceOrder, { IServiceOrder } from "./serviceOrder";
import CustomError from "../utils/customError";

export default class ServiceOrderService {

    public constructor() {}

    public async newServiceOrder(newServiceOrder: IServiceOrder): Promise<IServiceOrder> {

        try {
            await ServiceOrder.create(newServiceOrder);

            return newServiceOrder;
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async getAll(): Promise<IServiceOrder[]> {
        const serviceOrders = await ServiceOrder.find().populate('customer', 'name -_id');

        return serviceOrders;
    }
}