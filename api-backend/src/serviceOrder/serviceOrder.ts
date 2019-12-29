import mongose, { Schema, Document } from 'mongoose';
import { ICustomer } from '../customer/customer';
import { IBill } from '../bill/bill';

export interface IServiceOrder extends Document {
    description: string,
    createdAt: Date,
    customer: ICustomer['_id'],
    bill: IBill['_id'],
    cancelDate?: Date,
    isCanceled: boolean
}

const ServiceOrderSchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    bill: { type: Schema.Types.ObjectId, ref: 'Bill' },
    isCanceled: { type: Boolean, default: false }
});

export default mongose.model<IServiceOrder>('ServiceOrder', ServiceOrderSchema);