import { IMatches, ILeaderboard } from '../interfaces/Matches.interface';

export const calculateTotalPoints = (acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 3;
  }
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

export const calculateTotalVictories = (acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

export const calculateTotalDraws = (acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

export const calculateTotalLosses = (acc: number, curr: IMatches) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
};

const generatedArr = (singleMatches: IMatches[]) => {
  let goalsFavor = 0;
  let goalsTaken = 0;
  const resultArr = singleMatches.map((matche) => {
    const obj = {
      name: matche.homeTeam.teamName,
      totalPoints: singleMatches.reduce(calculateTotalPoints, 0),
      totalGames: singleMatches.length,
      totalVictories: singleMatches.reduce(calculateTotalVictories, 0),
      totalDraws: singleMatches.reduce(calculateTotalDraws, 0),
      totalLosses: singleMatches.reduce(calculateTotalLosses, 0),
      goalsFavor: goalsFavor += matche.homeTeamGoals,
      goalsOwn: goalsTaken += matche.awayTeamGoals,
      goalsBalance: goalsFavor - goalsTaken,
      efficiency: (((singleMatches.reduce(calculateTotalPoints, 0))
        / (singleMatches.length * 3)) * 100).toFixed(2) };
    return obj;
  });
  return resultArr;
};

export const makeLeardeboard = (arr: IMatches[]) => {
  let leaderboard: ILeaderboard[] = [];
  for (let index = 1; index <= 16; index += 1) {
    const singleMatches = arr.filter((matche) => matche.homeTeamId === index);
    const resultArr = generatedArr(singleMatches);
    leaderboard = [...leaderboard, resultArr[resultArr.length - 1]];
  }
  return leaderboard;
};
