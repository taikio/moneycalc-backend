
export default interface OutputAccountBalanceDto {

    /**
     * Quantidade de contas a receber pendentes
     */
    incomingPendingQuantity: number;
    /**
     * Quantidade de contas a pagar pendentes
     */
    outgoingPendingQuantity: number;
    /**
     * Quantidade de contas a receber pagas
     */
    incomingPaidQuantity: number;
    /**
     * Quantidade de contas a pagar pagas
     */
    outgoingPaidQuantity: number;
    /**
     * Valor total de contas a receber pendentes
     */
    incomingPendingValue: number;
    /**
     * Valor total de contas a pagar pendentes
     */
    outgoingPendingValue: number;
    /**
     * Valor total de contas a receber pagas
     */
    incomingPaidValue: number;
    /**
     * Valor total de contas a pagar pagas
     */
    outgoingPaidValue: number;
    /**
     * Balanço entre contas a receber - contas a pagar que já foram pagas
     */
    incomingOutgoingBalance: number;
    /**
     * Uma projeção somando todas as contas a receber - todas as contas a pagar idependente se estão pagas
     */
    incomingOutgoingProjection:number;
}