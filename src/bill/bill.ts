import mongose, { Schema, Document } from 'mongoose';
import PaymentMethod from '../utils/PaymentMethod';

export interface IBill extends Document {

    paymentMethod: PaymentMethod,
    value: number,
    /**
     * R = conta a receber,
     * P = conta a pagar
     */
    destiny: string,
    status: string,
    dueDate: Date,
    description: string
    /**
     * Dia em que foi paga
     */
    payDay?: Date,
    /**
     * Dia em que foi estornada
     */
    reversalDate?: Date,
    cancelDate?: Date,
    computedStatus: string,
    paid: boolean

}

const BillSchema = new Schema({
    paymentMethod: { type: Object, required: true },
    value: { type: Number, required: true },
    destiny: { type: String, required: true },
    status: { type: String, required: true, default: 'ATIVO' },
    dueDate: { type: Date, required: true, default: Date.now() },
    description: { type: String, required: true },
    payDay: { type: Date, default: null },
    reversalDate: { type: Date, default: null },
    cancelDate: { type: Date, default: null },
    paid: { type: Boolean, default: false }
});

export default mongose.model<IBill>('Bill', BillSchema);