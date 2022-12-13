import client from '../database';
import { Cart, CreateCartDTO } from './types/cart.types';
import { Order, CreateOrderDTO, UpdateOrderDTO } from './types/orders.types';

export class OrderStore {
  async addProduct(c: CreateCartDTO): Promise<Cart> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
      const result = await conn.query(sql, [c.quantity, c.order_id, c.product_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
export class Orders {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(o: CreateOrderDTO): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders(user_id) VALUES($1) RETURNING *';
      const result = await conn.query(sql, [o.user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async update(o: UpdateOrderDTO, id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE orders
            SET status = $1
            WHERE id=$2 RETURNING *`;
      const result = await conn.query(sql, [o.status, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
