import client from '../database';
import { Product } from '../models/types/products.types';

export class DashboardQueries {
  // Get all users that have made orders
  async usersWithOrders(): Promise<{ username: string }[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
  async productsInOrders(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM products INNER JOIN order_products ON products.id = order_products.id';

      const result = await conn.query(sql, []);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products with orders: ${err}`);
    }
  }
}
