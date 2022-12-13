import client from '../database';
import { CreateProductDTO, Product, UpdateProductDTO } from './types/products.types';

export class Products {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(p: CreateProductDTO): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products(name,price) VALUES($1,$2) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async update(p: UpdateProductDTO, id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE products
            SET name = $1, price = $2 
            WHERE id=$3 RETURNING *`;
      const result = await conn.query(sql, [p.name, p.price, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE  FROM products WHERE id=$1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
