import Teams from '../database/models/Teams';
import { ObjReturn, ITeams } from '../interfaces/Teams.interface';

export default class TeamsService {
  getAllTeams = async (): Promise<ObjReturn> => {
    const teams = await Teams.findAll();
    return { type: null, message: teams };
  };

  getTeamById = async (teamId: number): Promise<ObjReturn> => {
    const team = await Teams.findByPk(teamId);
    return { type: null, message: team as ITeams };
  };
}
