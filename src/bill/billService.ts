import InputBillDto from "./inputBillDto";
import Enumerable from 'linq';
import SystemConstants from "../utils/systemConstants";
import Bill, { IBill } from "./bill";
import CustomError from "../utils/customError";
import OutputAccountBalanceDto from "./OutputAccountBalanceDto";
import ServiceOrder from '../serviceOrder/serviceOrder';

export default class BillService {

    public constructor() {}

    public async newBill(newBillDto: InputBillDto, destiny: string): Promise<IBill> {

        try {
            const paymentMethod = Enumerable.from(SystemConstants.ListPaymentMethods())
            .firstOrDefault(x => x.SysId == newBillDto.PaymentMethodSysId);

            const billDestiny = destiny.toUpperCase() == SystemConstants.BillDestinyReceive
                    ? SystemConstants.BillDestinyReceive
                    : SystemConstants.BillDestinyPay;

            
            const bill: IBill = new Bill({
                paymentMethod: paymentMethod,
                value: newBillDto.Value,
                destiny: billDestiny,
                status: SystemConstants.BillStatus_EmAberto,
                dueDate: newBillDto.DueDate,
                description: newBillDto.Description
            });

            const savedBill = await Bill.create(bill);
            return savedBill;
            
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async getAll(): Promise<IBill[]> {

        try {
            const billsList = await Bill.find();
            return billsList;
        } catch (error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async getBillsByDate(startDate: Date, endDate: Date, destiny: string): Promise<IBill[]> {

        try {
            const billsList = await Bill.find().where('dueDate').gte(startDate).lte(endDate)
            .where('destiny').equals(destiny);

            billsList.forEach(bill => {
                if (bill.dueDate < new Date(Date.now())) {
                    bill.status = SystemConstants.BillStatus_Vencido;
                }
            });

            return billsList;
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async updatePaymentMethod(id: string, PaymentMethodSysId: string): Promise<void> {

        try {
            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError(`Não foi encontrado nenhum lançamento financeiro com o id ${id}`, 400, true);
            }

            const paymentMethod = Enumerable.from(SystemConstants.ListPaymentMethods()).firstOrDefault(x => x.SysId === PaymentMethodSysId);
            if (!paymentMethod) {
                throw new CustomError('Não foi encontrado um meio de pagamento válido!', 400, true);
            }

            await Bill.updateOne({ _id: id }, { paymentMethod: paymentMethod });
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async updateDueDate(id: string, dueDate: Date) {

        try {
            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError(`Não foi encontrado nenhum lançamento financeiro com o id ${id}`, 400, true);
            }

            if (dueDate === null || dueDate === undefined || dueDate < new Date(Date.now())) {
                throw new CustomError('A data de vencimento deve ser maior que a data atual!', 400, true);
            }

            await Bill.updateOne({ _id: id }, { dueDate: dueDate });
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async updateDescription(id: string, description: string) {

        try {
            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError(`Não foi encontrado nenhum lançamento financeiro com o id ${id}`, 400, true);
            }

            await Bill.updateOne({ _id: id }, { description: description });
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async updateValue(id: string, value: number) {

        try {

            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError(`Não foi encontrado nenhum lançamento financeiro com o id ${id}`, 400, true);
            }

            if (value <= 0){
                throw new CustomError('O valor deve ser maior que zero', 400, true);
            }

            await Bill.updateOne({ _id: id }, { value: value });
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async cancel(id: string) {

        try {
            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError('Não foi encontrado um lançamento financeiro com o ID informado', 400, true);
            }

            const serviceOrder = await ServiceOrder.findOne().where('bill').equals(id);

            if (serviceOrder === null || !serviceOrder.isCanceled) {
                throw new CustomError('Este lançamento está vinculado à uma ordem de serviço. Para cancelá-lo cancele a ordem de serviço', 400, true);
            }

            bill.status = SystemConstants.BillStatus_Cancelado;
            bill.cancelDate = new Date(Date.now());

            await bill.save();
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async delete(id: string) {

        try {
            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError('Não foi encontrado um lançamento financeiro com o ID informado', 400, true);
            }

            await Bill.deleteOne({ _id: id });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async getAccountBalance(startDate: Date, endDate: Date): Promise<OutputAccountBalanceDto> {

        try {
            const billsList = await Bill.find().where('dueDate').gte(startDate).lte(endDate);

            const incomingPending = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyReceive && !x.paid);
            const outgoingPending = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyPay && !x.paid);
            const incomingPaid = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyReceive && x.paid);
            const outgoingPaid = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyPay && x.paid);
            const totalIncomes = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyReceive);
            const totalOutgoing = Enumerable.from(billsList).where(x => x.destiny === SystemConstants.BillDestinyPay);

            const accountBalance: OutputAccountBalanceDto = {
                incomingPendingQuantity: incomingPending.count(),
                incomingPendingValue: incomingPending.sum(x => x.value),
                incomingPaidQuantity: incomingPaid.count(),
                incomingPaidValue: incomingPaid.sum(x => x.value),
                outgoingPendingQuantity: outgoingPending.count(),
                outgoingPendingValue: outgoingPending.sum(x => x.value),
                outgoingPaidQuantity: outgoingPaid.sum(),
                outgoingPaidValue: outgoingPaid.sum(x => x.value),
                incomingOutgoingBalance: incomingPaid.sum(x => x.value) - outgoingPaid.sum(x => x.value),
                incomingOutgoingProjection: totalIncomes.sum(x => x.value) - totalOutgoing.sum(x => x.value)
            }

            return accountBalance;
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    /**
     * Confirma a baixa do lançamento
     */
    public async MakeRetirement(id: string): Promise<void> {

        try{

            const bill = await Bill.findById(id);

            if (!bill) {
                throw new CustomError('Não foi encontrado um lançamento financeiro com o ID informado', 400, true);
            }

            bill.paid = true;
            bill.payDay = new Date(Date.now());
            bill.status = SystemConstants.BillStatus_Pago;

            await bill.save();
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }
}