import UserEntity from '../entities/user.entity';
import { UserModel } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { ILoginCredentials, IResetPasswordData } from '../interfaces/IUser.interface';
import { comparePassword, hashPassword, validatePassword } from '../utils/utils';

class UserService {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    public async createUser(data: UserEntity) {
        data.password = hashPassword(data.password);
        const userEntity = await this.userRepository.createUser(data);
        const userModel = new UserModel(userEntity);
        return userModel
    }


    public async authenticateUser(data: ILoginCredentials) {
        const userEntity = await this.userRepository.findOne({ phoneNumber: data.phoneNumber });
        console.log(userEntity);
        if (!userEntity || !comparePassword(userEntity.password, data.password)) {
            throw new HttpNotFoundError({
                msg: 'Password invalid or user not found',
                msgCode: 401,
            });
        }
        return userEntity;
    }
    public async resetPassword(data: IResetPasswordData) {
        let userEntity = await this.userRepository.findOne({ phoneNumber: data.phoneNumber });
        console.log(userEntity);
        console.log(data);
        if (!userEntity) {
            throw new HttpNotFoundError({
                msg: 'User not found',
                msgCode: 401,
            });
        }
        if (Date.parse(data.birthday) != userEntity.birthday.getTime()) {
            throw new HttpNotFoundError({
                msg: 'Birthday are not equal',
                msgCode: 401,
            });
        }
        if (!validatePassword(data.newPassword)) {
            throw new HttpNotFoundError({
                msg: 'password not safe enough, use at leats 8 characters with at least one number and one letter',
                msgCode: 401,
            });
        }
        userEntity.password = hashPassword(data.newPassword);
        console.log('hash password', userEntity.password);
        userEntity = await this.userRepository.updateUser(userEntity._id,userEntity);
        
    }
}
export default UserService;