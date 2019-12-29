import mongose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(this: IUser, next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export default mongose.model<IUser>('User', UserSchema);