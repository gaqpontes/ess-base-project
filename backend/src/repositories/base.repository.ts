import { Model } from 'mongoose';
import Database from '../database';
import BaseEntity from '../entities/base.entity';
import { HttpInternalServerError } from '../utils/errors/http.error';

type FilterFunction<T> = (item: T) => boolean;

export default class BaseRepository<T extends BaseEntity> {
  private prefix: string;
  private db: Database;
  private model: Model<any>;
  constructor(prefix: string, model: Model<any>) {
    this.prefix = prefix;
    this.model = model;
    this.db = Database.getInstance();
  }

  public async add(data: T): Promise<T> {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  public async update(
    id: String,
    data: Partial<T>
  ): Promise<T | null> {
    try {
      const result = await this.model.findByIdAndUpdate(id, data);
      return result;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  public async findOne(filter: any): Promise<T | null> {
    try {
      const result = await this.model.findOne(filter).exec();
      return result || null;
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  public async findAll(filter?: any): Promise<T[]> {
    try {
      return await filter
        ? this.model.find(filter).exec()
        : this.model.find({}).exec();
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }

  public async delete(filter: FilterFunction<T>): Promise<void> {
    try {
      if (!this.db.data[this.prefix]) {
        return;
      }

      this.db.data[this.prefix] = this.db.data[this.prefix].filter(filter);
    } catch (e) {
      throw new HttpInternalServerError();
    }
  }
}
