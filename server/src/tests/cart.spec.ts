import { Orders, OrderStore } from '../models/orders';
import { Products } from '../models/products';
import { Users } from '../models/users';

import supertest from 'supertest';
import app from '../index';
import client from '../database';

import { Cart } from '../models/types/cart.types';
import { Order } from '../models/types/orders.types';
import { User } from '../models/types/users.types';
import { Product } from '../models/types/products.types';

const request = supertest(app);

const order = new Orders();
const user = new Users();
const product = new Products();

const store = new OrderStore();

describe('cart test', () => {
  describe('cart model', () => {
    it('test addProduct method exist', () => {
      expect(store.addProduct).toBeDefined();
    });
  });

  describe('Test model logic', () => {
    const u = {
      username: 'mo2000',
      first_name: 'mohamed',
      last_name: 'crespo',
      password: '12345'
    } as User;
    const o = {
      user_id: 2
    } as Order;

    const p = {
      name: 'book1',
      price: 25
    } as Product;

    beforeAll(async () => {
      const createUser = await user.create(u);
      u.id = createUser.id;

      o.user_id = createUser.id;
      const createOrder = await order.create(o);
      o.id = createOrder.id;
      o.status = createOrder.status;
      const createProduct = await product.create(p);
      p.id = createProduct.id;
    });

    afterAll(async () => {
      const connection = await client.connect();

      const p_sql = `DELETE FROM products`;
      const c_sql = `DELETE FROM order_products`;

      const o_sql = `DELETE FROM orders`;

      const u_sql = `DELETE FROM users`;

      await connection.query(c_sql);
      await connection.query(o_sql);
      await connection.query(p_sql);
      await connection.query(u_sql);

      connection.release();
    });

    it('add product method should working correctly', async () => {
      const addProduct = await store.addProduct({
        quantity: 40,
        order_id: o.id,
        product_id: p.id
      } as Cart);
      expect(addProduct).toEqual({
        id: addProduct.id,
        quantity: 40,
        order_id: o.id,
        product_id: p.id
      } as Cart);
    });
  });
  describe('cart API Endpoint', () => {
    it('Should index return an error if do not pass order_id', async () => {
      const res = await request
        .post('/orders/:id/products')
        .set('Content-type', 'application/json');

      expect(res.status).toBe(400);
    });
  });
});
