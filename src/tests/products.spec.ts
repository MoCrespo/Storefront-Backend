import { Products } from '../models/products';
import client from '../database';
import { Product } from '../models/types/products.types';
import supertest from 'supertest';
import app from '../index';
import { User } from '../models/types/users.types';
import { Users } from '../models/users';

const product = new Products();
const user = new Users();

const request = supertest(app);
let token = '';

describe('Prodcuts test', () => {
  describe('products API Endpoints', () => {
    const u = {
      username: 'mocrespo',
      password: '12345',
      first_name: 'mohamed',
      last_name: 'crespo'
    } as User;
    const prod = {
      name: 'book1',
      price: 25
    } as Product;

    beforeAll(async () => {
      const createUser = await user.create(u);
      u.id = createUser.id;

      const createProduct = await product.create(prod);
      prod.id = createProduct.id;
    });

    afterAll(async () => {
      const connection = await client.connect();
      const p_SEQUENCE = `ALTER SEQUENCE products_id_seq RESTART WITH 1;`;
      const p_sql = `DELETE FROM products`;

      const u_SEQUENCE = `ALTER SEQUENCE users_id_seq RESTART WITH 1;`;
      const u_sql = `DELETE FROM users`;

      await connection.query(u_SEQUENCE);
      await connection.query(u_sql);
      await connection.query(p_SEQUENCE);
      await connection.query(p_sql);

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
      it('Should create product', async () => {
        const res = await request
          .post('/products')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'book2',
            price: 25
          } as Product);
        expect(res.status).toBe(200);
      });

      it('Should index return a list of products', async () => {
        const res = await request
          .get('/products')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.products.length).toBe(2);
      });

      it('Should show return a single product', async () => {
        const res = await request
          .get(`/products/${prod.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.product.name).toBe('book1');
      });

      it('Should update a product ', async () => {
        const res = await request
          .patch(`/products/${prod.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'book3',
            price: 55
          });

        const { id, name, price } = res.body.data.product;

        expect(res.status).toBe(202);
        expect(id).toBe(prod.id);
        expect(name).toBe('book3');
        expect(price).toBe(55);
      });
      it('Should delete a product by id', async () => {
        const res = await request
          .delete(`/products/${prod.id}`)
          .set('Authorization', `Bearer ${token}`);

        const { id, name, price } = res.body.data.product;
        expect(res.status).toBe(200);
        expect(id).toBe(prod.id);
        expect(name).toBe('book3');
        expect(price).toBe(55);
      });
    });
  });

  describe('Product model', () => {
    describe('Test methods exist', () => {
      it('should have an index method', () => {
        expect(product.index).toBeDefined();
      });

      it('should have an show method', () => {
        expect(product.show).toBeDefined();
      });

      it('should have an create method', () => {
        expect(product.create).toBeDefined();
      });

      it('should have an delete method', () => {
        expect(product.delete).toBeDefined();
      });

      it('should have an update method', () => {
        expect(product.update).toBeDefined();
      });
    });

    describe('Test model logic', () => {
      const prod = {
        name: 'book',
        price: 25
      } as Product;

      beforeAll(async () => {
        const createProduct = await product.create(prod);
        prod.id = createProduct.id;
      });

      afterAll(async () => {
        const connection = await client.connect();
        const sql = 'DELETE FROM products';

        await connection.query(sql);
        connection.release();
      });

      it('Create method should return a new product', async () => {
        const createProduct = await product.create({
          name: 'book2',
          price: 25
        } as Product);
        expect(createProduct).toEqual({
          id: createProduct.id,
          name: 'book2',
          price: 25
        } as Product);
      });

      it('Index method should return all products', async () => {
        const getProducts = await product.index();
        expect(getProducts.length).toBe(2);
      });

      it('Show method should return a product by Id', async () => {
        const getProduct = await product.show(prod.id.toString());
        expect(getProduct.id).toBe(prod.id);
        expect(getProduct.name).toBe(prod.name);
        expect(getProduct.price).toBe(prod.price);
      });

      it('Update method should return a product with edited', async () => {
        const updateProduct = await product.update(
          {
            name: 'booktest',
            price: 25
          },
          prod.id.toString()
        );

        expect(updateProduct.id).toBe(prod.id);
        expect(updateProduct.name).toBe('booktest');
        expect(updateProduct.price).toBe(25);
      });

      it('Delete method should delete product from database', async () => {
        const deleteProduct = await product.delete(prod.id.toString());
        expect(deleteProduct.id).toBe(prod.id);
      });
    });
  });
});
