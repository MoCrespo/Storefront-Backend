import express, { Request, Response } from 'express';

import { ProductsService } from '../services/products.service';
import verifyAuthToken from '../middleware/auth.middleware';

const index = async (_req: Request, res: Response) => {
  const products = await ProductsService.getProducts();
  return res.status(200).send({ statusCode: 200, data: { products } });
};

const show = async (req: Request, res: Response) => {
  const product = await ProductsService.getProduct(req.params.id);
  return res.status(200).send({ statusCode: 200, data: { product } });
};

const create = async (req: Request, res: Response) => {
  try {
    const product = await ProductsService.addProduct(req.body);
    return res.status(200).send({ statusCode: 200, data: { product } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product = await ProductsService.updateProduct(req.body, req.params.id);
    return res.status(202).send({ statusCode: 202, data: { product } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const product = await ProductsService.deleteProduct(req.params.id);
    return res.status(200).send({ statusCode: 200, data: { product } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.patch('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productsRoutes;
