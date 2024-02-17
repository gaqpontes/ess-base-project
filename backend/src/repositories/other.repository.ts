import TestEntity from '../entities/test.entity';
import { UserModel } from '../models/user.model';
import BaseRepository from './base.repository';

class OtherRepository extends BaseRepository<TestEntity> {
  constructor() {
    super('tests', UserModel);
  }

  public async getTests(): Promise<TestEntity[]> {
    return await this.findAll();
  }
}

export default OtherRepository;
