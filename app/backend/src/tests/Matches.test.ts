import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as JWT from 'jsonwebtoken';

import { app } from '../app';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import {
  allMatches,
  matchesInProgress,
  endsMatches,
  createMatche,
  team16,
  team8
} from './mocks/matches.mocks';
import { payload, tokenMock } from './mocks/JWT.mocks';
import { IMatches } from '../interfaces/Matches.interface';

chai.use(chaiHttp);

const { expect } = chai;

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

describe('Teste da rota "/matches"', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  })

  it('Verifica se é possível buscar todas as partidas', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as IMatches[] | any);

    chaiHttpResponse = await chai.request(app).get('/matches/');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(allMatches);
  });

  it('Verifica se é possível buscar todas as partidas em andamento', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesInProgress as IMatches[] | any);

    chaiHttpResponse = await chai.request(app).get('/matches/?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(matchesInProgress);
  });

  it('Verifica se é possível buscar todas as partidas finalizadas', async () => {
    sinon.stub(Matches, 'findAll').resolves(endsMatches as IMatches[] | any);

    chaiHttpResponse = await chai.request(app).get('/matches/?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.deep.equal(endsMatches);
  });

  // it('Verifica se é possível cadastrar uma partida em andamento', async () => {
  //   sinon.stub(Matches, 'create').resolves(createMatche as IMatches | any);
  //   sinon.stub(JWT, 'verify').resolves(payload);
  //   sinon.stub(Teams, 'findByPk').onFirstCall().resolves(team16 as any)
  //     .onSecondCall().resolves(team8 as any)

  //   chaiHttpResponse = await chai.request(app).post('/matches/').send({
  //     homeTeamId: 16,
  //     awayTeamId: 8,
  //     homeTeamGoals: 2,
  //     awayTeamGoals: 2,
  //   }).set('Authorization', tokenMock);

  //   expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
  //   expect(chaiHttpResponse.body).to.deep.equal(createMatche);
  // });

  it('Verifica se não é possível cadastrar uma partida com times iguais', async () => {
    sinon.stub(Matches, 'create').resolves(createMatche as IMatches | any);
    sinon.stub(JWT, 'verify').resolves(payload);
    sinon.stub(Teams, 'findByPk').onFirstCall().resolves(team8 as any)
      .onSecondCall().resolves(team8 as any)

    chaiHttpResponse = await chai.request(app).post('/matches/').send({
      homeTeamId: 8,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }).set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  });

  // it('Verifica se não é possível cadastrar uma partida com times que não existem', async () => {
  //   before(async () => {
  //     sinon.stub(Matches, 'create').resolves(createMatche as IMatches | any);
  //     sinon.stub(JWT, 'verify').resolves(payload);
  //     sinon.stub(Teams, 'findByPk').onFirstCall().resolves(undefined)
  //       .onSecondCall().resolves(undefined);
  //   });

  //   chaiHttpResponse = await chai.request(app).post('/matches/').send({
  //     homeTeamId: 16,
  //     awayTeamId: 8,
  //     homeTeamGoals: 2,
  //     awayTeamGoals: 2,
  //   }).set('Authorization', tokenMock);

  //   expect(chaiHttpResponse.status).to.be.equal(404);
  //   expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
  // });

  // it('Verifica se não é possível cadastrar uma partida com token inválido', async () => {
  //   sinon.stub(Matches, 'create').resolves(createMatche as IMatches | any);
  //   sinon.stub(JWT, 'verify').resolves(payload);
  //   sinon.stub(Teams, 'findByPk').onFirstCall().resolves(null)
  //     .onSecondCall().resolves(null);

  //   chaiHttpResponse = await chai.request(app).post('/matches/').send({
  //     homeTeamId: 16,
  //     awayTeamId: 8,
  //     homeTeamGoals: 2,
  //     awayTeamGoals: 2,
  //   }).set('Authorization', 'tokenMock');

  //   expect(chaiHttpResponse.status).to.be.equal(401);
  //   expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  // });

  it('Verifica se é possível alterar o status de uma partida', async () => {
    sinon.stub(Matches, 'update').resolves();

    chaiHttpResponse = await chai.request(app).patch('/matches/2/finish');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  });

  it('Verifica se é possível atualizar uma partida', async () => {
    sinon.stub(Matches, 'update').resolves();

    chaiHttpResponse = await chai.request(app).patch('/matches/5/').send({
      homeTeamGoals: 3,
      awayTeamGoals: 1
    });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body.message).to.be.equal('The fields were updated');
  });
});
