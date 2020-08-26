//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import PDetail from '../models/PDetail';
import AppError from '../errors/AppError';

//= ===========================================================================>
// Interfaces
interface PDetailCreation {
  match_id: number;
  hero_id: number;
  assists: number;
  camps_stacked: number;
  damage: number;
  deaths: number;
  denies: number;
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
class CreatePDetailService {
  public async execute({
    match_id,
    hero_id,
    assists,
    camps_stacked,
    damage,
    deaths,
    denies,
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
  }: PDetailCreation): Promise<void> {
    const pDetailRepository = getRepository(PDetail);

    try {
      const pDetail = pDetailRepository.create({
        match_id,
        hero_id,
        assists,
        camps_stacked,
        damage,
        deaths,
        denies,
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

      await pDetailRepository.save(pDetail);
    } catch {
      throw new AppError('biri biri', 401);
    }
  }
}

//= ===========================================================================>

export default CreatePDetailService;
