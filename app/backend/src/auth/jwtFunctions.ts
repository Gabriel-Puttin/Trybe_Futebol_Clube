import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import JWT from '../interfaces/JWT.interface';

dotenv.config();

const secret = process.env.JWT_SECRET || 'kpaskp&¨%$1312313';

const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const createToken = (data: JWT) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
