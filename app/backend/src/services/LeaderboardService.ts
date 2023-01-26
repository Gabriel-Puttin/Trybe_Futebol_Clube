import { IMatches } from '../interfaces/Matches.interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { makeLeardeboard } from '../helpers/helpersFunctions';

export default class LeaderboardService {
  getHome = async () => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } }] });
    const matchesEnds = matches.filter(({ inProgress }) => !inProgress);
    const leaderboard = makeLeardeboard(matchesEnds as unknown as IMatches[]);

    const arrayOrdenado = leaderboard.sort((a, b) => {
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

    return { type: null, message: arrayOrdenado };
  };
}
