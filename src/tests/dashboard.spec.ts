import supertest from "supertest";
import app from "..";
import { User } from "../models/types/users.types";
import { Users } from "../models/users";
import client from "../database";


const request = supertest(app)
const users = new Users()

let token = ''

describe('dashboard API Endpoints', () => {
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
      })

      it('should get token after authenticate', async () => {
        const res = await request.post('/users/auth').set('Content-type', 'application/json').send({
          username: 'mocrespo',
          password: '12345'
        });

        expect(res.status).toBe(200);
        const { token: userToken } = res.body.data;

        token = userToken;
      });
    it('should return users in orders',async() => {
        const res = await request
        .get('/users-with-orders')
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })
    it('should return products in orders',async() => {
        const res = await request
        .get('/users-with-orders')
        .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
    })
})