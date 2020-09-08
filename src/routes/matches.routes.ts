//= ===========================================================================>
import { Router } from 'express';

import CreateMatchService from '../services/CreateMatchService';
import ProcessDataService from '../services/ProcessDataService';
import apiOpenDoto from '../services/apiOpenDoto';

//= ===========================================================================>
interface RequestDTO {
  data: Array<{
    match_id: number;
    hero_id: number;
  }>;
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
    negative_votes: number;
    positive_votes: number;
    radiant_score: number;
    radiant_win: boolean;
    start_time: number;
    tower_status_dire: number;
    tower_status_radiant: number;
    patch: number;
    replay_url: string;
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
      lane_role: number;
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
      region: number;
      isRadiant: boolean;
      win: number;
      lose: number;
      total_gold: number;
      kda: number;
      abandons: number;
      rank_tier: number;
    }>;
  };
}

//= ===========================================================================>
const matchesRouter = Router();

const key = '59E8F88A8E32C3A5152060D1669763C3'; // domain -> manuki
// const key2 = '3A09438BC52B5126DD9252C36AA3D3DA';
// const key3 = '2673759BBC000BC076494BE824612D61';

//= ===========================================================================>
// get matches info and save into database --> steam key
matchesRouter.get('/', async (request, _response) => {
  const { account_id } = request.body;
  // get 20 first match_ids and hero_ids
  const { data }: RequestDTO = await apiOpenDoto.get(
    `/players/${account_id}/recentMatches`,
  );

  // for each 'match' -> {}
  data.map(async match => {
    const { match_id, hero_id } = match;

    // { match.props, match.players[] } = response.apiOpenDoto;
    // eslint-disable-next-line no-shadow
    const { data }: OpenDotoDTO = await apiOpenDoto.get(
      `/matches/${match.match_id}?api_key=${key}`,
    );

    // match.props
    const { dire_score, radiant_score, replay_url, game_mode, duration } = data;

    // match.players[]
    // for each match.player -> compare hero_id
    data.players.map(async player => {
      if (player.match_id === match_id && player.hero_id === hero_id) {
        const createMatch = new CreateMatchService();
        // eslint-disable-next-line no-await-in-loop
        await createMatch.execute({
          match_id,
          hero_id,
          duration,
          game_mode,
          radiant_score,
          dire_score,
          replay_url,
          assists: player.assists,
          camps_stacked: player.camps_stacked,
          deaths: player.deaths,
          denies: player.denies,
          lane_role: player.lane_role,
          gold: player.gold,
          gold_per_min: player.gold_per_min,
          xp_per_min: player.xp_per_min,
          hero_damage: player.hero_damage,
          kills: player.kills,
          obs_placed: player.obs_placed,
          sen_placed: player.sen_placed,
          tower_damage: player.tower_damage,
          win: player.win,
          personaname: player.personaname,
        });
      }
    });
  });

  return _response.json(data);
});

//= ===========================================================================>
// eslint-disable-next-line no-shadow
matchesRouter.get('/dashboard', async (_request, response) => {
  const processData = new ProcessDataService();
  const data = await processData.execute();

  return response.json(data);
});

//= ===========================================================================>

export default matchesRouter;
