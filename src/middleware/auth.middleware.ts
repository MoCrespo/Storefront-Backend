import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';

const secretKey: Secret = `${process.env.SECRET_KEY}`;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;

    if (!authorizationHeader) throw 'is required';
    else {
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(token, secretKey);
    }

    next();
  } catch (error) {
    return res.status(400).send({ statusCode: 400, error: { msg: `Token ${error}` } });
  }
};

export default verifyAuthToken;
