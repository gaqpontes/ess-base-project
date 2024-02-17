import UserEntity from '../entities/user.entity';
import { connect, Mongoose } from 'mongoose';
import {UserModel} from '../models/user.model';
import { stringIsNullOrEmpty } from '../utils/utils';
export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;
  private static connection: Mongoose;

  private constructor() {
    this.data = {};
  }
  static async setupConnection(DBUSER: string, DBPASSWORD: string, DBURI: string) {
    if (stringIsNullOrEmpty(DBUSER) || stringIsNullOrEmpty(DBPASSWORD) || stringIsNullOrEmpty(DBURI)) {
      throw new Error('Missing DB credentials, please check your .env');
    }
    const connection = await connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@${DBURI}`);
    Database.connection = connection;
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }
}
