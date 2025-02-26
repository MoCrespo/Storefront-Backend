import { CreateUserDTO, UpdateUserDTO } from '../models/types/users.types';
import { Users } from '../models/users';

const userModel = new Users();

export class UserService {
  static async getUsers() {
    try {
      const users = await userModel.index();
      return users;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async getUser(id: string) {
    try {
      const user = await userModel.show(id);
      return user;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async addUser(user: CreateUserDTO) {
    try {
      const newUser = await userModel.create(user);

      return newUser;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async updateUser(user: UpdateUserDTO, id: string) {
    try {
      const updateUser = await userModel.update(user, id);

      return updateUser;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async getUserByUsername(username: string) {
    return await userModel.getByUsername(username);
  }

  static async deleteUser(id: string) {
    try {
      const del = await userModel.delete(id);

      return del;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async login(username: string, password: string) {
    try {
      const login = await userModel.authenticate(username, password);

      return login;
    } catch (err) {
      throw err as string;
    }
  }
}
