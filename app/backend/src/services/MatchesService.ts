import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { ObjReturn, IMatches, INewMatche, IUpdateMatche } from '../interfaces/Matches.interface';
import validateTeam from './validations/validateTeam';

export default class MatchesService {
  getAllMatches = async (): Promise<ObjReturn> => {
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }] });

    return { type: null, message: matches as unknown as IMatches[] };
  };

  getAllMatchesByProgress = async (queryString: string): Promise<ObjReturn> => {
    const inProgress = queryString === 'true';
    const matches = await Matches.findAll({
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress } });

    return { type: null, message: matches as IMatches[] };
  };

  createNewMatche = async (matcheInfo: INewMatche): Promise<ObjReturn> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matcheInfo;
    const verifyTeam = await validateTeam(matcheInfo);
    if (verifyTeam) return verifyTeam;

    const { dataValues } = await Matches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });

    return { type: null, message: dataValues as INewMatche };
  };

  updateMatcheInProgress = async (matcheId: number): Promise<ObjReturn> => {
    await Matches.update({ inProgress: false }, { where: { id: matcheId } });
    return { type: null, message: 'Finished' };
  };

  updateMatche = async (matcheId: number, attMatche: IUpdateMatche): Promise<ObjReturn> => {
    const { homeTeamGoals, awayTeamGoals } = attMatche;
    const matche = await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: matcheId } },
    );
    console.log(matche);
    return { type: null, message: 'The fields were updated' };
  };
}
