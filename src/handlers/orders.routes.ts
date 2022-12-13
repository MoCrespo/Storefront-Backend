import express, { Request, Response } from 'express';

import verifyAuthToken from '../middleware/auth.middleware';
import { OrdersService } from '../services/orders.service';

const addProduct = async (req: Request, res: Response) => {
  try {
    const add = await OrdersService.addProduct(
      req.body
    );
    return res.status(200).send({ statusCode: 200, data: add });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const index = async (_req: Request, res: Response) => {
  const orders = await OrdersService.getOrders();
  return res.status(200).send({ statusCode: 200, data: { orders } });
};

const show = async (req: Request, res: Response) => {
  const order = await OrdersService.getOrder(req.params.id);
  return res.status(200).send({ statusCode: 200, data: { order } });
};

const create = async (req: Request, res: Response) => {
  try {
    const order = await OrdersService.addOrder(req.body);
    return res.status(200).send({ statusCode: 200, data: { order } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order = await OrdersService.updateProduct(req.body, req.params.id);
    return res.status(202).send({ statusCode: 202, data: { order } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const order = await OrdersService.deleteOrder(req.params.id);
    return res.status(200).send({ statusCode: 200, data: { order } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: `${err}` });
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.patch('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  // add product

  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default ordersRoutes;
