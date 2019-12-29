import PaymentMethod from "../utils/PaymentMethod";
import SystemConstants from "../utils/systemConstants";

export default class LookupsService {

    public constructor() {}

    public getPaymentMethods(): Array<PaymentMethod> {

        const listPaymentMethods = new Array<PaymentMethod>();

        listPaymentMethods.push(SystemConstants.PaymentMethod_Billet);
        listPaymentMethods.push(SystemConstants.PaymentMethod_Card);
        listPaymentMethods.push(SystemConstants.PaymentMethod_Money);

        return listPaymentMethods;
    }
}