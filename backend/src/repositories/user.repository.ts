import UserEntity from '../entities/user.entity';
import { UserModel } from '../models/user.model';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('Users',UserModel);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.findAll();
  }

  public async getUser(id: string): Promise<UserEntity | null> {
    return await this.findOne({});
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    return await this.add(data);
  }

  public async updateUser(
    id: string,
    data: UserEntity
  ): Promise<UserEntity | null> {
    return await this.update(id, data);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default UserRepository;
