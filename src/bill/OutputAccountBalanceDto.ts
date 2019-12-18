
export default interface OutputAccountBalanceDto {

    /**
     * Quantidade de contas a receber pendentes
     */
    IncomingPendingQuantity: number;
    /**
     * Quantidade de contas a pagar pendentes
     */
    OutgoingPendingQuantity: number;
    /**
     * Quantidade de contas a receber pagas
     */
    IncomingPaidQuantity: number;
    /**
     * Quantidade de contas a pagar pagas
     */
    OutgoingPaidQuantity: number;
    /**
     * Valor total de contas a receber pendentes
     */
    IncomingPendingValue: number;
    /**
     * Valor total de contas a pagar pendentes
     */
    OutgoingPendingValue: number;
    /**
     * Valor total de contas a receber pagas
     */
    IncomingPaidValue: number;
    /**
     * Valor total de contas a pagar pagas
     */
    OutgoingPaidValue: number;
    /**
     * Balanço entre contas a receber - contas a pagar que já foram pagas
     */
    IncomingOutgoingBalance: number;
    /**
     * Uma projeção somando todas as contas a receber - todas as contas a pagar idependente se estão pagas
     */
    IncomingOutgoingProjection:number;
}