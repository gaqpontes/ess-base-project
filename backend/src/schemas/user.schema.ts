import { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser.interface';

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        birthday: { type: Date, required: true },
        phoneNumber: { type: String, required: true,  unique: true },
    }
);

export default UserSchema;