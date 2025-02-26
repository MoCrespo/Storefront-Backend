import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserService } from '../services/users.service';
import verifyAuthToken from '../middleware/auth.middleware';

dotenv.config();

const secretKey: Secret = `${process.env.SECRET_KEY}`;

const index = async (_req: Request, res: Response) => {
  const users = await UserService.getUsers();
  return res.send({ statusCode: 200, data: { users } });
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUser(req.params.id);
    return res.send({ statusCode: 200, data: { user } });
  } catch (err) {
    return res.send({ statusCode: 400, error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.addUser(req.body);
    const token = jwt.sign({ user: newUser }, secretKey);
    return res.send({ statusCode: 200, data: { token, newUser } });
  } catch (err) {
    res.status(400).send({ statusCode: 400, error: { msg: `${err}` } });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(req.body, req.params.id);
    return res.status(202).send({ statusCode: 202, data: { user } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: { msg: err } });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUser(req.params.id);
    return res.status(200).send({ statusCode: 200, data: { user } });
  } catch (err) {
    return res.status(400).send({ statusCode: 400, error: { msg: err } });
  }
};

const auth = async (req: Request, res: Response) => {
  try {
    const getUser = await UserService.login(req.body.username, req.body.password);
    const token = jwt.sign({ user: getUser }, secretKey);

    res.status(200).send({ statusCode: 200, data: { token } });
  } catch (err) {
    res.status(401).send({ statusCode: 401, error: { msg: `${err}` } });
  }
};

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.patch('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/auth', auth);
};

export default usersRoutes;
