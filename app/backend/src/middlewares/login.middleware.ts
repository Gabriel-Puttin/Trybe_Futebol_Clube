import { Request, Response, NextFunction } from 'express';

const HTTP_BAD_REQUEST_STATUS = 400;

export default function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'All fields must be filled' });
  }
  next();
}
