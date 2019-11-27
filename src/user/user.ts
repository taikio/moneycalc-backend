import mongose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

export default mongose.model<IUser>('User', UserSchema);