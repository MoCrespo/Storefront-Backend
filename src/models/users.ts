import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { CreateUserDTO, UpdateUserDTO, User } from './types/users.types';

dotenv.config();

const { pepper, saltRounds } = process.env;

export class Users {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id,username, first_name, last_name FROM users';
      const result = await conn.query(sql);
      conn.release();
      // if (!result.rows.length) throw 'users are empty 😓';
      return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT id,username, first_name, last_name FROM users WHERE id=$1';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      // if (!result.rows.length) throw 'user is not exist';

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: CreateUserDTO): Promise<User> {
    try {
      const conn = await client.connect();
      const userCheck = 'SELECT * FROM users WHERE username=$1';
      const check = await conn.query(userCheck, [u.username]);

      if (!check.rows.length) {
        const sql =
          'INSERT INTO users (username,first_name,last_name,password) VALUES($1, $2,$3,$4) RETURNING id,username,first_name,last_name';

        const hash = bcrypt.hashSync(
          u.password + pepper,

          parseInt(saltRounds as string)
        );

        const result = await conn.query(sql, [u.username, u.first_name, u.last_name, hash]);

        const user = result.rows[0];

        conn.release();
        return user;
      } else {
        throw 'user already exists';
      }
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from users WHERE username=$1';

      const result = await conn.query(sql, [username]);
      if (!result.rows.length) throw 'username or password incorrect';
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw err as string;
    }
  }

  async passwordValidation(username: string, password: string) {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE username=$1;';

      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          conn.release();
          return user;
        } else {
          throw 'username or password incorrect!';
        }
      }
    } catch (err) {
      throw err as string;
    }
  }

  async authenticate(username: string, password: string): Promise<User | undefined> {
    try {
      const existUser = await this.getByUsername(username);

      if (existUser) {
        return this.passwordValidation(username, password);
      }
    } catch (err) {
      throw err as string;
    }
  }

  async update(u: UpdateUserDTO, id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users
            SET first_name = $1, last_name = $2 
            WHERE id=$3 RETURNING id,username,first_name,last_name `;
      const result = await conn.query(sql, [u.first_name, u.last_name, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=$1 RETURNING id, username';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
