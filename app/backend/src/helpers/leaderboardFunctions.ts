import { ILeaderboard } from '../interfaces/Matches.interface';

const generalLeaderboard = (a1: ILeaderboard[], a2: ILeaderboard[]) => a1.map((time, index) => {
  if (time.name === a2[index].name) {
    return {
      name: time.name,
      totalPoints: time.totalPoints + a2[index].totalPoints,
      totalGames: time.totalGames + a2[index].totalGames,
      totalVictories: time.totalVictories + a2[index].totalVictories,
      totalDraws: time.totalDraws + a2[index].totalDraws,
      totalLosses: time.totalLosses + a2[index].totalLosses,
      goalsFavor: time.goalsFavor + a2[index].goalsFavor,
      goalsOwn: time.goalsOwn + a2[index].goalsOwn,
      goalsBalance: time.goalsBalance + a2[index].goalsBalance,
      efficiency: (((time.totalPoints + a2[index].totalPoints)
        / ((time.totalGames + a2[index].totalGames) * 3)) * 100).toFixed(2),
    };
  }
  return null;
});

export default generalLeaderboard;
