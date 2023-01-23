import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import verifyLogin from '../middlewares/login.middleware';
import verifyUserToken from '../middlewares/JWTVerify.middleware';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', verifyLogin, loginController.login);
loginRouter.get('/validate/', verifyUserToken, loginController.getRole);

export default loginRouter;
