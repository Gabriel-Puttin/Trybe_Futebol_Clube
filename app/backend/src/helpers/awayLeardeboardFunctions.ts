import { IMatches, ILeaderboard } from '../interfaces/Matches.interface';

const calculateAwayTotalPoints = (acc: number, curr: IMatches) => {
  if (curr.awayTeamGoals > curr.homeTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const calculateAwayTotalVictories = (acc: number, curr: IMatches) => {
  if (curr.awayTeamGoals > curr.homeTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const calculateTotalDraws = (acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

export const calculateAwayTotalLosses = (acc: number, curr: IMatches) => {
  if (curr.awayTeamGoals < curr.homeTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const generatedArr = (singleMatches: IMatches[]) => {
  let goalsFavor = 0;
  let goalsTaken = 0;
  const resultArr = singleMatches.map((matche) => {
    const obj = {
      name: matche.awayTeam.teamName,
      totalPoints: singleMatches.reduce(calculateAwayTotalPoints, 0),
      totalGames: singleMatches.length,
      totalVictories: singleMatches.reduce(calculateAwayTotalVictories, 0),
      totalDraws: singleMatches.reduce(calculateTotalDraws, 0),
      totalLosses: singleMatches.reduce(calculateAwayTotalLosses, 0),
      goalsFavor: goalsFavor += matche.awayTeamGoals,
      goalsOwn: goalsTaken += matche.homeTeamGoals,
      goalsBalance: goalsFavor - goalsTaken,
      efficiency: (((singleMatches.reduce(calculateAwayTotalPoints, 0))
        / (singleMatches.length * 3)) * 100).toFixed(2) };
    return obj;
  });
  return resultArr;
};

export const makeAwayLeardeboard = (arr: IMatches[]) => {
  let leaderboard: ILeaderboard[] = [];
  for (let index = 1; index <= 16; index += 1) {
    const singleMatches = arr.filter((matche) => matche.awayTeamId === index);
    const resultArr = generatedArr(singleMatches);
    leaderboard = [...leaderboard, resultArr[resultArr.length - 1]];
  }
  return leaderboard;
};
