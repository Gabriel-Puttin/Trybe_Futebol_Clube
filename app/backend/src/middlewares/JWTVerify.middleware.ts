import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'kpaskp&¨%$1312313';

const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const data = jwt.verify(token, secret);
    req.body.user = data;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyUserToken;
