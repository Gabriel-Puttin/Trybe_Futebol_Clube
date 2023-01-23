import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

const HTTP_OK_STATUS = 200;

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  login = async (req: Request, res: Response): Promise<Response | void> => {
    const { type, message } = await this.loginService.login(req.body);
    if (type) return res.status(type).send({ message });
    res.status(HTTP_OK_STATUS).json({ token: message });
  };

  getRole = async (req: Request, res: Response) => {
    const { user } = req.body;
    console.log(user);
    const { data: { role } } = user;
    res.status(HTTP_OK_STATUS).json({ role });
  };
}
