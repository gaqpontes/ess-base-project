import bcrypt from 'bcrypt';
import fs from 'fs';
import { IUser } from '../interfaces/user.interface';

export default class UserDatabase {
  private users: IUser[] = [];
  private usersFilePath: string;

  constructor(usersFilePath: string) {
    this.usersFilePath = usersFilePath;
    this.users = this.loadUsersFromFile();
  }

  private loadUsersFromFile(): IUser[] {
    try {
      const data = fs.readFileSync(this.usersFilePath, 'utf-8');
      if (!data.trim()) {
        return []; // Retorna um array vazio se o arquivo estiver vazio
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading users from database:', error);
      return [];
    }
  }

  private saveUsersToFile(): void {
    try {
      fs.writeFileSync(this.usersFilePath, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error('Error saving users in the database:', error);
    }
  }

  insert(user: IUser): void {
    this.users.push(user);
    this.saveUsersToFile();
  }

  findByEmail(email: string): IUser | undefined {
    return this.users.find((user) => user.email === email);
  }

  findByUserName(username: string): IUser | undefined {
    return this.users.find((user) => user.username === username);
  }

  getAllUsers(): IUser[] {
    return this.users;
  }

  async createUser(name: string, email: string, username: string, password: string): Promise<IUser> {
    const newUser: IUser = {
      name,
      email,
      username,
      password, // Use a senha fornecida pelo usuário diretamente
    };
    this.insert(newUser);
    return newUser;
  }
  
  async authenticateUser(email: string, password: string): Promise<IUser | undefined> {
    const user = this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return undefined;
  }
}
