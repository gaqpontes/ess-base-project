import { IUser } from '../interfaces/IUser.interface';
import BaseEntity from './base.entity';
export default class UserEntity extends BaseEntity implements IUser {
  _id: string;
  name: string;
  phoneNumber: string;
  password: string;
  birthday: Date;
  constructor(data: UserEntity) {
    super(data.id || '');
    this.name = data.name;
    this.birthday = data.birthday;
    this.password = data.password;
    this.phoneNumber = data.phoneNumber;
  }
}
