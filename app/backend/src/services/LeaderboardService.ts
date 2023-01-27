import { IMatches, ILeaderboard } from '../interfaces/Matches.interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { makeLeardeboard } from '../helpers/homeLeardeboardFunctions';
import { makeAwayLeardeboard } from '../helpers/awayLeardeboardFunctions';

export default class LeaderboardService {
  private orderArr = (arr: ILeaderboard[]) => {
    const result = arr.sort((a, b) => {
      if (b.totalPoints > a.totalPoints) return 1;
      if (b.totalPoints < a.totalPoints) return -1;
      if (b.totalVictories > a.totalVictories) return 1;
      if (b.totalVictories < a.totalVictories) return -1;
      if (b.goalsBalance > a.goalsBalance) return 1;
      if (b.goalsBalance < a.goalsBalance) return -1;
      if (b.goalsFavor > a.goalsFavor) return 1;
      if (b.goalsFavor < a.goalsFavor) return -1;
      return 0;
    });
    return result;
  };

  getHome = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    const matchesEnds = matches.filter(({ inProgress }) => !inProgress);
    const leaderboard = makeLeardeboard(matchesEnds as unknown as IMatches[]);

    const arrayOrdenado = this.orderArr(leaderboard);

    return { type: null, message: arrayOrdenado };
  };

  getAway = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: false },
    });
    const leaderboard = makeAwayLeardeboard(matches as unknown as IMatches[]);

    const arrayOrdenado = this.orderArr(leaderboard);
    return { type: null, message: arrayOrdenado };
  };
}
