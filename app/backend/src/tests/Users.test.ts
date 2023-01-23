import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { userMock, userInfo, tokenMock, wrongUserInfo, JWTUserMock } from './mocks/login.mocks';
import * as auth from '../auth/jwtFunctions';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rotar "/login"', () => {

  let chaiHttpResponse: Response;
  before(async () => {
    sinon.stub(Users, "findOne").resolves(userMock as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
    sinon.restore();
  })

  it('Verifica se é possível cadastrar um usuário com sucesso', async () => {
    sinon.stub(auth, 'createToken').returns(tokenMock.token)
    chaiHttpResponse = await chai.request(app).post('/login/').send(userInfo);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.token).to.be.equal(tokenMock.token);
  });

  it('Verificar se não é possível fazer o login sem informar o email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login/').send({ password: userInfo.password });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  })

  it('Verifica se não é possível fazer o login com um usuário inexistente', async () => {
    chaiHttpResponse = await chai.request(app).post('/login/').send(wrongUserInfo);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  // it('verifica a rota "/login/validate/" se é possível retornar a função do usuário logado', async () => {
  //   sinon.stub(auth, 'verifyToken').returns(JWTUserMock);
  //   chaiHttpResponse = await chai.request(app).get('/login/validate/').set('Authorization', tokenMock.token);

  //   expect(chaiHttpResponse.status).to.be.equal(200);
  //   expect(chaiHttpResponse.body.role).to.be.equal(JWTUserMock.data.role);
  // });
});