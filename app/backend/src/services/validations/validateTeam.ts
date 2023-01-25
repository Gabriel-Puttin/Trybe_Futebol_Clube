import Teams from '../../database/models/Teams';
import { INewMatche, ObjReturn } from '../../interfaces/Matches.interface';

const HTTP_NOT_FOUND_STATUS = 404;

export default async function validateTeam(matcheInfo: INewMatche): Promise<ObjReturn | void> {
  const { homeTeamId, awayTeamId } = matcheInfo;
  const team = await Teams.findByPk(homeTeamId || awayTeamId);
  if (!team) {
    return { type: HTTP_NOT_FOUND_STATUS, message: 'There is no team with such id!' };
  }
}
