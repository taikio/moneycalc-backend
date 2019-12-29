import mongose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    shortName: string;
    cpf: string;
    email: string;
}

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    cpf: { type: String, unique: true },
    email: { type: String }
});


export default mongose.model<ICustomer>('Customer', CustomerSchema);