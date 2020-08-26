//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Match from '../models/Match';

//= ===========================================================================>
// Interfaces
interface MatchCreation {
  match_id: number;
  hero_id: number;
  duration: number;
  game_mode: number;
  radiant_score: number;
  dire_score: number;
  replay_url: string;
}

//= ===========================================================================>
// Saving a match id
class CreateMatchService {
  public async execute({
    match_id,
    hero_id,
    duration,
    game_mode,
    radiant_score,
    dire_score,
    replay_url,
  }: MatchCreation): Promise<void> {
    const matchRepository = getRepository(Match);

    try {
      const matchExists = await matchRepository.findOne({
        where: { match_id },
      });
      if (!matchExists) {
        const match = matchRepository.create({
          match_id,
          hero_id,
          duration,
          game_mode,
          radiant_score,
          dire_score,
          replay_url,
        });

        await matchRepository.save(match);
      }
    } catch {
      throw new AppError('This match already exists in database', 401);
    }
  }
}

//= ===========================================================================>

export default CreateMatchService;
