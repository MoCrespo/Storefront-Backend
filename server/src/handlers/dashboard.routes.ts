import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/auth.middleware';

import { DashboardQueries } from '../services/dashboard.service';

const dashboard = new DashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    return res.status(200).send({ statusCode: 200, data: { users } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: err });
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    return res.status(200).send({ statusCode: 200, data: { products } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: err });
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products-in-orders', verifyAuthToken, productsInOrders);
  app.get('/users-with-orders', verifyAuthToken, usersWithOrders);
};
export default dashboardRoutes;
