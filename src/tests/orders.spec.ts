import { Orders } from '../models/orders';
import { Users } from '../models/users';
import client from '../database';
import { Order } from '../models/types/orders.types';
import { User } from '../models/types/users.types';

const order = new Orders();
const user = new Users();

describe('Order model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(order.index).toBeDefined();
    });

    it('should have an show method', () => {
      expect(order.show).toBeDefined();
    });

    it('should have an create method', () => {
      expect(order.create).toBeDefined();
    });

    it('should have an delete method', () => {
      expect(order.delete).toBeDefined();
    });

    it('should have an update method', () => {
      expect(order.update).toBeDefined();
    });
  });

  describe('Test model logic', () => {
    const u = {
      username: 'mo',
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

    it('Create method should return a new order', async () => {
      const createOrder = await order.create({
        user_id: u.id
      } as Order);
      expect(createOrder).toEqual({
        id: createOrder.id,
        status: createOrder.status,
        user_id: u.id
      } as Order);
    });

    it('Index method should return all orders', async () => {
      const getOrders = await order.index();
      expect(getOrders.length).toBe(2);
    });

    it('Show method should return a order by Id', async () => {
      const getOrder = await order.show(o.id.toString());
      expect(getOrder.id).toBe(o.id);
      expect(getOrder.status).toBe(o.status);
      expect(getOrder.user_id).toBe(o.user_id);
    });

    it('Update method should return an order with edited', async () => {
      const updateOrder = await order.update(
        {
          status: 'complete'
        },
        o.id.toString()
      );

      expect(updateOrder.id).toBe(o.id);
      expect(updateOrder.user_id).toBe(o.user_id);
      expect(updateOrder.status).toBe('complete');
    });

    it('Delete method should delete order from database', async () => {
      const deleteOrder = await order.delete(o.id.toString());
      expect(deleteOrder.id).toBe(o.id);
    });
  });
});
