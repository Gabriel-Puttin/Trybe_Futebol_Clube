import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  getHomeLeaderboard = async (req: Request, res: Response) => {
    const { message } = await this.leaderboardService.getHome();
    res.status(200).json(message);
  };

  getAwayLeaderboard = async (req: Request, res: Response) => {
    const { message } = await this.leaderboardService.getAway();
    res.status(200).json(message);
  };
}
