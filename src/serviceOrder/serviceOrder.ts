import mongose, { Schema, Document } from 'mongoose';
import { ICustomer } from '../customer/customer';

export interface IServiceOrder extends Document {
    description: string,
    createdAt: Date,
    customer: ICustomer['_id']
}

const ServiceOrderSchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
});

export default mongose.model<IServiceOrder>('ServiceOrder', ServiceOrderSchema);