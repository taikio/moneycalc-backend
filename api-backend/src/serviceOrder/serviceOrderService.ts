import ServiceOrder, { IServiceOrder } from "./serviceOrder";
import CustomError from "../utils/customError";
import BillService from "../bill/billService";
import CustomerService from "../customer/customerService";

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
        const serviceOrders = await ServiceOrder.find()
        .populate('customer', '-_id')
        .populate('bill', '-_id');

        return serviceOrders;
    }

    public async GetServiceOrdersByDate(startDate: Date, endDate: Date): Promise<IServiceOrder[]> {

        try {
            const serviceOrders = await ServiceOrder.find()            
            .where('createdAt').gte(startDate).lte(endDate)
            .populate('customer', '-_id')
            .populate('bill', '-_id').exec();

            // serviceOrders.forEach( element => {
            //     element.bill.value = parseFloat(element.bill.value);
            // });

            return serviceOrders;
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async CancelServiceOrder(id: string): Promise<void> {

        try {

            const serviceOrder = await ServiceOrder.findById(id);

            if (!serviceOrder) {
                throw new CustomError('Não existe uma ordem de serviço com o ID informado', 400, true);
            }

            if (serviceOrder.isCanceled) {
                throw new CustomError('A ordem de serviço já está cancelada', 400, true);
            }

            serviceOrder.cancelDate = new Date(Date.now());
            serviceOrder.isCanceled = true;           

            await serviceOrder.save();

            const billService = new BillService();
            await billService.cancel(serviceOrder.bill);
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeCustomer(serviceOrderId: string, customerId: string): Promise<void> {

        try {
            const customerService = new CustomerService();
            const customer = await customerService.getById(customerId);

            const serviceOrder = await ServiceOrder.findById(serviceOrderId);

            if (!serviceOrder) {
                throw new CustomError('Não foi encontrada uma ordem de serviço com o ID informado', 400, true);
            }

            serviceOrder.customer = customer.id;

            await serviceOrder.save();
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeDescription(id: string, description: string): Promise<void> {

        try {
            const serviceOrder = await ServiceOrder.findById(id);

            if (!serviceOrder) {
                throw new CustomError('Não foi encontrada uma ordem de serviço com o ID informado', 400, true);
            }

            await ServiceOrder.updateOne({ _id: id }, { description: description });

            const billService = new BillService();
            await billService.updateDescription(serviceOrder.bill, description);
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }
}