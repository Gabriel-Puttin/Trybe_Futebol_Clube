import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get('/', teamsController.getAllTeams);
teamsRoutes.get('/:id', teamsController.getTeamById);

export default teamsRoutes;
