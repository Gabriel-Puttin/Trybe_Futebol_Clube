import Login, { ObjReturn } from '../interfaces/login.interface';
import { createToken } from '../auth/jwtFunctions';
import JWT from '../interfaces/JWT.interface';
import validateUser from './validations/validateUser';
import Users from '../database/models/Users';

const HTTP_UNAUTHORIZED_STATUS = 401;

export default class LoginService {
  login = async (userInfo: Login): Promise<ObjReturn> => {
    const { email } = userInfo;
    const verifyPassword = await validateUser(userInfo);
    if (verifyPassword) return verifyPassword;
    const user = await Users.findOne({ where: { email } });
    if (!user) return { type: HTTP_UNAUTHORIZED_STATUS, message: 'Incorrect email or password' };
    const { password: _password, ...payload } = user.dataValues;
    const token = createToken(payload as JWT);
    return { type: null, message: token };
  };
}
