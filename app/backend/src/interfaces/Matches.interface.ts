export interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface INewMatche {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IUpdateMatche {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ObjReturn {
  type: null | number;
  message: string | IMatches[] | INewMatche
}
