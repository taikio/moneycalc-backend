
export default class PaymentMethod {
    
    public constructor(sysId: string, description: string) {
        this.SysId = sysId;
        this.Description = description;
    }
    
    SysId: string;
    Description: string;
}