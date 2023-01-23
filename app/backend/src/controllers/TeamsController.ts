import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

const HTTP_OK_STATUS = 200;

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  getAllTeams = async (_req: Request, res: Response): Promise<Response | void> => {
    const { message } = await this.teamsService.getAllTeams();
    res.status(HTTP_OK_STATUS).json(message);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = await this.teamsService.getTeamById(Number(id));
    res.status(HTTP_OK_STATUS).json(message);
  };
}
