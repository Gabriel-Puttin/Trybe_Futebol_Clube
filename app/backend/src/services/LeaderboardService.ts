import { IMatches, ILeaderboard } from '../interfaces/Matches.interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { makeLeardeboard } from '../helpers/homeLeardeboardFunctions';
import { makeAwayLeardeboard } from '../helpers/awayLeardeboardFunctions';
import generalLeaderboard from '../helpers/leaderboardFunctions';

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

    return { type: leaderboard, message: arrayOrdenado };
  };

  getAway = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: false },
    });
    const leaderboard = makeAwayLeardeboard(matches as unknown as IMatches[]);

    const arrayOrdenado = this.orderArr(leaderboard);
    return { type: leaderboard, message: arrayOrdenado };
  };

  getLeardeboard = async () => {
    const matchesAway = await Matches.findAll({
      include: [{ model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: false },
    });
    const matchesHome = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: false },
    });
    const leaderboardHome = makeLeardeboard(matchesHome as unknown as IMatches[]);
    const leaderboardAway = makeAwayLeardeboard(matchesAway as unknown as IMatches[]);

    const result = generalLeaderboard(leaderboardHome, leaderboardAway);
    const arrayOrdenado = this.orderArr(result as ILeaderboard[]);

    return { type: null, message: arrayOrdenado };
  };
}
