import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';
import { allTeams, oneTeam } from './mocks/teams.mocks';
import * as auth from '../auth/jwtFunctions';
import { ITeams } from '../interfaces/Teams.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rotar "/teams"', () => {

  let chaiHttpResponse: Response;

  after(() => {
    sinon.restore();
  })

  it('Verifica se é possível buscar todos os times', async () => {
    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(allTeams as ITeams[] | any);
    });

    chaiHttpResponse = await chai.request(app).get('/teams/');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  });

  it('Verifica se é possível buscar por apenas 1 time', async () => {
    before(async () => {
      sinon.stub(Teams, 'findByPk').resolves(oneTeam as ITeams | any);
    });

    chaiHttpResponse = await chai.request(app).get('/teams/10/');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(oneTeam);
  });
});
