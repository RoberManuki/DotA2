//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Match from '../models/Match';

//= ===========================================================================>
// Interfaces

// Match props from a specific ${hero_id}
interface MatchCreation {
  match_id: number;
  hero_id: number;
  duration: number;
  game_mode: number;
  radiant_score: number;
  dire_score: number;
  replay_url: string;
  assists: number;
  camps_stacked: number;
  deaths: number;
  denies: number;
  lane_role: number;
  gold: number;
  gold_per_min: number;
  xp_per_min: number;
  hero_damage: number;
  kills: number;
  obs_placed: number;
  sen_placed: number;
  tower_damage: number;
  win: number;
  personaname: string;
}

//= ===========================================================================>
class CreateMatchService {
  public async execute({
    match_id,
    hero_id,
    duration,
    game_mode,
    radiant_score,
    dire_score,
    replay_url,
    assists,
    camps_stacked,
    deaths,
    denies,
    lane_role,
    gold,
    gold_per_min,
    xp_per_min,
    hero_damage,
    kills,
    obs_placed,
    sen_placed,
    tower_damage,
    win,
    personaname,
  }: MatchCreation): Promise<void> {
    const matchRepository = getRepository(Match);
    try {
      // If already exists a match with this ${match_id} -> Don't create another
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
          assists,
          camps_stacked,
          deaths,
          denies,
          lane_role,
          gold,
          gold_per_min,
          xp_per_min,
          hero_damage,
          kills,
          obs_placed,
          sen_placed,
          tower_damage,
          win,
          personaname,
        });
        await matchRepository.save(match);
      } else {
        console.log('Error -> Do not repeat matches in database!');
      }
    } catch {
      throw new AppError('Error at creation service -> 401?', 401);
    }
  }
}

//= ===========================================================================>

export default CreateMatchService;
