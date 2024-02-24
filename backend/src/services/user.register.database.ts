import bcrypt from 'bcrypt';
import fs from 'fs';
import { IUser } from '../interfaces/user.interface';

export default class UserDatabase {
  private usersFilePath: string;
  private static instance: UserDatabase | null = null; // Alteração na declaração da instância estática

  constructor(usersFilePath: string) {
    this.usersFilePath = usersFilePath;
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

  private saveUsersToFile(users: IUser[]): void {
    try {
      fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Error saving users in the database:', error);
    }
  }

  private getUsers(): IUser[] {
    return this.loadUsersFromFile();
  }

  private saveUsers(users: IUser[]): void {
    this.saveUsersToFile(users);
  }

  insert(user: IUser): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  findByEmail(email: string): IUser | undefined {
    const users = this.getUsers();
    return users.find((user) => user.email === email);
  }

  findByUserName(username: string): IUser | undefined {
    const users = this.getUsers();
    return users.find((user) => user.username === username);
  }

  getAllUsers(): IUser[] {
    return this.getUsers();
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
    const users = this.getUsers();
    const user = users.find((user) => user.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return undefined;
  }

  clear(): void {
    // Limpa os dados do arquivo
    this.saveUsers([]);
  }
  // Método estático para obter a instância única da classe
  static getInstance(usersFilePath: string): UserDatabase {
    if (!UserDatabase.instance) {
      UserDatabase.instance = new UserDatabase(usersFilePath);
    }
    return UserDatabase.instance;
  }
}
