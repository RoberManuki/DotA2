//= ===========================================================================>
// Imports
import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateMatchService from '../services/CreateMatchService';
import apiSteam from '../services/apiSteam';
import apiOpenDoto from '../services/apiOpenDoto';
import Match from '../models/Match';

//= ===========================================================================>
// Interfaces
interface SteamDTO {
  data: {
    result: {
      matches: Array<{
        match_id: number;
        players: Array<{
          account_id: number;
          player_slot: number;
          hero_id: number;
        }>;
      }>;
    };
  };
}

interface OpenDotoDTO {
  data: {
    barracks_status_dire: number;
    barracks_status_radiant: number;
    dire_score: number;
    duration: number;
    first_blood_time: number;
    game_mode: number;
    human_players: number;
    lobby_type: number;
    negative_votes: number;
    positive_votes: number;
    radiant_score: number;
    radiant_win: boolean;
    start_time: number;
    tower_status_dire: number;
    tower_status_radiant: number;
    players: Array<{
      match_id: number;
      player_slot: number;
      account_id: number;
      additional_units: number;
      assists: number;
      backpack_0: number;
      backpack_1: number;
      backpack_2: number;
      backpack_3: number;
      camps_stacked: number;
      creeps_stacked: number;
      damage: number;
      damage_inflictor: number;
      damage_inflictor_received: number;
      damage_taken: number;
      damage_targets: number;
      deaths: number;
      denies: number;
      gold: number;
      gold_per_min: number;
      hero_damage: number;
      hero_healing: number;
      hero_id: number;
      item_0: number;
      item_1: number;
      item_2: number;
      item_3: number;
      item_4: number;
      item_5: number;
      item_neutral: number;
      kill_streaks: number;
      killed: number;
      killed_by: number;
      kills: number;
      lane_pos: number;
      last_hits: number;
      leaver_status: number;
      level: number;
      obs: number;
      obs_left_log: number;
      obs_log: number;
      obs_placed: number;
      party_size: number;
      permanent_buffs: number;
      repicked: number;
      roshans_killed: number;
      rune_pickups: number;
      runes: number;
      sen_placed: number;
      stuns: number;
      teamfight_participation: number;
      tower_damage: number;
      towers_killed: number;
      xp_per_min: number;
      personaname: string;
      name: string;
      radiant_win: boolean;
      start_time: number;
      duration: number;
      lobby_type: number;
      game_mode: number;
      region: number;
      isRadiant: boolean;
      win: number;
      lose: number;
      total_gold: number;
      kda: number;
      abandons: number;
      rank_tier: number;
    }>;
    region: number;
  };
}

//= ===========================================================================>
// Router instance
const matchesRouter = Router();

const key = '59E8F88A8E32C3A5152060D1669763C3'; // domain -> manuki

//= ===========================================================================>
// api link --> Steam
// https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/
// ?matches_requested=1&key=<key> --> 1 match
// GET --> get 30 match ids per account key and save in database
matchesRouter.get('/', async (request, response) => {
  const { data }: SteamDTO = await apiSteam.get(
    `/IDOTA2Match_570/GetMatchHistory/V001/?matches_requested=30&key=${key}`,
  );
  const { matches } = data.result;

  matches.map(async match => {
    const { match_id } = match;
    const createMatch = new CreateMatchService();
    // eslint-disable-next-line no-await-in-loop
    await createMatch.execute({ match_id });
  });

  return response.json(matches.length);
});

//= ===========================================================================>
// api link --> Open Doto
// https://api.opendota.com/api/matches/271145478?api_key=YOUR-API-KEY
// GET --> get 50 match ids per account key and save in database
matchesRouter.get(`/matches`, async (request, response) => {
  const idRepository = getRepository(Match);

  const idsArray = await idRepository.find({
    take: 30,
  });

  idsArray.map(async match => {
    const { data }: OpenDotoDTO = await apiOpenDoto.get(
      `/matches/${match.match_id}?api_key=${key}`,
    );
    // log aleatório
    console.log(data.players.map(player => player.personaname));
  });

  // pegar ids (api steam) -> ok
  // fazer chamadas com os ids (api openDoto) -> ok
  // analisar o que pode ser feito com os dados disponíveis -> X
  // processar/gerar novos dados -> X
  // mostrar os dados via web (react) -> X
  // mostrar os dados via mobile (react native) -> X
  return response.json();
});

//= ===========================================================================>

export default matchesRouter;
