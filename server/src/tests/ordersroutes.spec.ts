import supertest from 'supertest';
import app from '../index';
import { Orders } from '../models/orders';
import { Users } from '../models/users';
import client from '../database';
import { Order } from '../models/types/orders.types';
import { User } from '../models/types/users.types';

const order = new Orders();
const user = new Users();

const request = supertest(app);
let token = '';

describe('orders API Endpoints', () => {
  const u = {
    username: 'mo-order-endpoints',
    first_name: 'mohamed',
    last_name: 'crespo',
    password: '12345'
  } as User;
  const o = {
    user_id: 2
  } as Order;

  beforeAll(async () => {
    const createUser = await user.create(u);
    u.id = createUser.id;

    o.user_id = createUser.id;
    const createOrder = await order.create(o);
    o.id = createOrder.id;
    o.status = createOrder.status;
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql = 'DELETE FROM orders';

    await connection.query(sql);
    connection.release();
  });

  describe('Test auth method', () => {
    it('should get token after authenticate', async () => {
      const res = await request.post('/users/auth').set('Content-type', 'application/json').send({
        username: 'mo',
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
    it('Should create order', async () => {
      const res = await request
        .post('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: u.id
        } as Order);
      expect(res.status).toBe(200);
    });

    it('Should index return a list of orders', async () => {
      const res = await request
        .get('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.orders.length).toBe(2);
    });

    it('Should show return a single order', async () => {
      const res = await request
        .get(`/orders/${o.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.order.id).toBe(o.id);
    });

    it('Should update a order ', async () => {
      const res = await request
        .patch(`/orders/${o.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'complete'
        });

      const { id, status } = res.body.data.order;

      expect(res.status).toBe(202);
      expect(id).toBe(o.id);
      expect(status).toBe('complete');
    });
    it('Should delete a product by id', async () => {
      const res = await request.delete(`/orders/${o.id}`).set('Authorization', `Bearer ${token}`);

      const { id, status } = res.body.data.order;
      expect(res.status).toBe(200);
      expect(id).toBe(o.id);
      expect(status).toBe('complete');
    });
  });
});
