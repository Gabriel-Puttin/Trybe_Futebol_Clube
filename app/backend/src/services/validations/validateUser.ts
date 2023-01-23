import * as bcrypt from 'bcryptjs';
import Login, { ObjReturn } from '../../interfaces/login.interface';
import Users from '../../database/models/Users';

const HTTP_UNAUTHORIZED_STATUS = 401;

export default async function validateUser(userInfo: Login): Promise<ObjReturn | void> {
  const { email, password } = userInfo;
  const user = await Users.findOne({ where: { email } });
  const isPasswordValid = user && bcrypt.compareSync(password, user.dataValues.password);
  if (!isPasswordValid) {
    return { type: HTTP_UNAUTHORIZED_STATUS, message: 'Incorrect email or password' };
  }
}
