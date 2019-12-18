import PaymentMethod from './PaymentMethod';

export default class SystemConstants {

    public constructor() {}

    public static BillDestinyReceive: string = 'R';
    public static BillDestinyPay: string = 'P';

    public static BillStatus_EmAberto: string = 'ATIVO';
    public static BillStatus_Vencido: string = 'VENCIDO';
    public static BillStatus_Pago: string = 'PAGO';
    public static BillStatus_Cancelado: string = 'CANCELADO';
    
    public static PaymentMethod_Money: PaymentMethod = new PaymentMethod
    (
        "DINHEIRO",
        "Dinheiro"
    );
    
    public static PaymentMethod_Card = new PaymentMethod
    (
        "CARTAO",
        "Cartao de Credito"
    );
    
    public static PaymentMethod_Billet = new PaymentMethod
    (
        "BOLETO",
        "Boleto Bancario"
    );

    public static ListPaymentMethods(): Array<PaymentMethod>
    {
        var listReturn = new Array<PaymentMethod>();
        
        listReturn.push(this.PaymentMethod_Card);
        listReturn.push(this.PaymentMethod_Money);
        listReturn.push(this.PaymentMethod_Billet);

        return listReturn;
    }
}