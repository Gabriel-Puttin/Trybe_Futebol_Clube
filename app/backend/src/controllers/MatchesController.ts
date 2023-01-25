import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  getAllMatches = async (_req: Request, res: Response): Promise<Response | void> => {
    const { message } = await this.matchesService.getAllMatches();
    res.status(HTTP_OK_STATUS).json(message);
  };

  getAllMatchesByProgress = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    const { inProgress } = req.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      return next();
    }
    const { message } = await this.matchesService.getAllMatchesByProgress(inProgress as string);
    res.status(HTTP_OK_STATUS).json(message);
  };

  createNewMatche = async (req: Request, res: Response): Promise<Response | void> => {
    const { type, message } = await this.matchesService.createNewMatche(req.body);
    if (type) return res.status(type).send({ message });
    res.status(HTTP_CREATED_STATUS).json(message);
  };

  updateMatcheInProgress = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { message } = await this.matchesService.updateMatcheInProgress(Number(id));
    res.status(HTTP_OK_STATUS).json({ message });
  };

  updateMatche = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { message } = await this.matchesService.updateMatche(Number(id), req.body);
    res.status(HTTP_OK_STATUS).json({ message });
  };
}
