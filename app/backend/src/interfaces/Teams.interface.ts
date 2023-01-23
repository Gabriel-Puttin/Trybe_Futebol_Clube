export interface ITeams {
  id: number;
  teamName: string;
}

export interface ObjReturn {
  type: null | number;
  message: ITeams | ITeams[]
}
