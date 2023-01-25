import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import verifyUserToken from '../middlewares/JWTVerify.middleware';
import verifyEqualsTeams from '../middlewares/matches.middleware';

const matchesRoutes = Router();
const matchesController = new MatchesController();

matchesRoutes.get('/?', matchesController.getAllMatchesByProgress, matchesController.getAllMatches);
// matchesRoutes.get('/', matchesController.getAllMatches);
matchesRoutes.post('/', verifyUserToken, verifyEqualsTeams, matchesController.createNewMatche);
matchesRoutes.patch('/:id/finish', matchesController.updateMatcheInProgress);
matchesRoutes.patch('/:id', matchesController.updateMatche);

export default matchesRoutes;
