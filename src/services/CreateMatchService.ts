//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Match from '../models/Match';

//= ===========================================================================>
// Interfaces
interface MatchCreation {
  match_id: number;
}

//= ===========================================================================>
// Saving a match id
class CreateMatchService {
  public async execute({ match_id }: MatchCreation): Promise<Match> {
    const matchRepository = getRepository(Match);

    const matchExists = await matchRepository.findOne({ where: { match_id } });
    if (!matchExists) {
      const match = matchRepository.create({
        match_id,
      });

      await matchRepository.save(match);

      return match;
    }
    throw new AppError('This match already exists in database', 401);
  }
}

//= ===========================================================================>

export default CreateMatchService;
