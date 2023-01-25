import { Request, Response, NextFunction } from 'express';

const HTTP_UNPROCESSABLE_STATUS = 422;

export default function verifyEqualsTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (Number(homeTeamId) === Number(awayTeamId)) {
    return res.status(HTTP_UNPROCESSABLE_STATUS)
      .send({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}
