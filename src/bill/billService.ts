import InputBillDto from "./inputBillDto";
import Enumerable from 'linq';
import SystemConstants from "../utils/systemConstants";
import Bill, { IBill } from "./bill";
import CustomError from "../utils/customError";

export default class BillService {

    public constructor() {}

    public async newBill(newBillDto: InputBillDto, destiny: string) {

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

            await Bill.create(bill);
            
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }
}