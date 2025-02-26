import { Users } from '../models/users';
import { User } from '../models/types/users.types';
import client from '../database';
import supertest from 'supertest';
import app from '../index';

const users = new Users();
const request = supertest(app);
let token = '';

describe('users Test', () => {
  describe('users API Endpoints', () => {
    const user = {
      username: 'mocrespo',
      password: '12345',
      first_name: 'mohamed',
      last_name: 'crespo'
    } as User;

    beforeAll(async () => {
      const createUser = await users.create(user);
      user.id = createUser.id;
    });

    afterAll(async () => {
      const connection = await client.connect();
      const SEQUENCE = `ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
      const sql = `DELETE FROM users`;

      await connection.query(SEQUENCE);
      await connection.query(sql);

      connection.release();
    });

    describe('Test auth method', () => {
      it('should get token after authenticate', async () => {
        const res = await request.post('/users/auth').set('Content-type', 'application/json').send({
          username: 'mocrespo',
          password: '12345'
        });

        expect(res.status).toBe(200);
        const { token: userToken } = res.body.data;

        token = userToken;
      });

      it('should be failed authenticate with wrong username', async () => {
        const res = await request.post('/users/auth').set('Content-type', 'application/json').send({
          username: 'fake-username',
          password: 'fake-password'
        });

        expect(res.status).toBe(401);
      });
    });

    describe('Test CRUD API', () => {
      it('Should create user', async () => {
        const res = await request
          .post('/users')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            username: 'mocrespo18',
            password: '12345',
            first_name: 'mohamed',
            last_name: 'crespo'
          } as User);
        expect(res.status).toBe(200);
      });

      it('Should index return a list of users', async () => {
        const res = await request
          .get('/users')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.users.length).toBe(2);
      });

      it('Should show return a single user', async () => {
        const res = await request
          .get(`/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.user.username).toBe('mocrespo');
      });

      it('Should update a user ', async () => {
        const res = await request
          .patch(`/users/${user.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...user,
            first_name: 'mohamed18',
            last_name: 'crespo18'
          });

        const { id, username, first_name, last_name } = res.body.data.user;

        expect(res.status).toBe(202);
        expect(id).toBe(user.id);
        expect(username).toBe(user.username);
        expect(first_name).toBe('mohamed18');
        expect(last_name).toBe('crespo18');
      });
      it('Should delete a user by id', async () => {
        const res = await request
          .delete(`/users/${user.id}`)
          .set('Authorization', `Bearer ${token}`);

        const { id, username } = res.body.data.user;
        expect(res.status).toBe(200);
        expect(id).toBe(user.id);
        expect(username).toBe(user.username);
      });
    });
  });

  describe('User model', () => {
    describe('Test methods exist', () => {
      it('should have an index method', () => {
        expect(users.index).toBeDefined();
      });

      it('should have an show method', () => {
        expect(users.show).toBeDefined();
      });

      it('should have an create method', () => {
        expect(users.create).toBeDefined();
      });

      it('should have an auth method', () => {
        expect(users.authenticate).toBeDefined();
      });
      it('should have an delete method', () => {
        expect(users.delete).toBeDefined();
      });

      it('should have an passwordValidation method', () => {
        expect(users.passwordValidation).toBeDefined();
      });
      it('should have an getByUsername method', () => {
        expect(users.getByUsername).toBeDefined();
      });
    });

    describe('Test model logic', () => {
      const u = {
        username: 'mo',
        first_name: 'mohamed',
        last_name: 'crespo',
        password: '12345'
      } as User;

      beforeAll(async () => {
        const createUser = await users.create(u);
        u.id = createUser.id;
      });

      afterAll(async () => {
        const connection = await client.connect();
        const sql = 'DELETE FROM users';

        await connection.query(sql);
        connection.release();
      });

      it('Create method should return a new user', async () => {
        const createUser = await users.create({
          username: 'mo2',
          first_name: 'mohamed',
          last_name: 'crepso',
          password: '12345'
        } as User);
        expect(createUser).toEqual({
          id: createUser.id,
          username: 'mo2',
          first_name: 'mohamed',
          last_name: 'crepso'
        } as User);
      });

      it('Index method should return all users', async () => {
        const getUsers = await users.index();
        expect(getUsers.length).toBe(2);
      });

      it('Show method should return a user by Id', async () => {
        const getUser = await users.show(u.id.toString());
        expect(getUser.id).toBe(u.id);
        expect(getUser.username).toBe(u.username);
        expect(getUser.first_name).toBe(u.first_name);
        expect(getUser.last_name).toBe(u.last_name);
      });

      it('Update method should return a user with edited', async () => {
        const updateUser = await users.update(
          {
            first_name: 'edit user',
            last_name: 'edit user'
          },
          u.id.toString()
        );

        expect(updateUser.id).toBe(u.id);
        expect(updateUser.first_name).toBe('edit user');
        expect(updateUser.last_name).toBe('edit user');
      });

      it('Delete method should delete user from database', async () => {
        const deletUser = await users.delete(u.id.toString());
        expect(deletUser.id).toBe(u.id);
      });
    });
  });
});
