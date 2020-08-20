//= ===========================================================================>
// Imports
import { Router } from 'express';

import CreateMatchService from '../services/CreateMatchService';
import api from '../services/api';
// import Match from '../models/Match';

//= ===========================================================================>
// Interfaces
interface ResponseDTO {
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

//= ===========================================================================>
// api links
// https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/
// ?key=<key> --> last 25 matches
// https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/
// ?matches_requested=1&key=<key> --> last match
//= ===========================================================================>

// Router instance
const matchesRouter = Router();

//= ===========================================================================>
// GET --> get 50 match ids per account key and save in database
matchesRouter.get('/', async (request, response) => {
  const key = '59E8F88A8E32C3A5152060D1669763C3'; // domain -> manuki
  const idsArray: Array<number> = [];
  const { data }: ResponseDTO = await api.get(
    `/IDOTA2Match_570/GetMatchHistory/V001/?key=${key}`,
  );
  const { matches } = data.result;

  // Saving 50 match_ids into an array and also in database
  let x = 0;
  while (matches && x < 50) {
    const { match_id } = matches[x];
    idsArray.push(match_id);
    const createMatch = new CreateMatchService();
    // eslint-disable-next-line no-await-in-loop
    await createMatch.execute({
      match_id,
    });
    x += 1;
  }
  x = 0;

  return response.json(idsArray);
});

//= ===========================================================================>

// matchesRouter.post('/', async (request, response) => {
//   const { match_id }: Match = request.body;

//   const createMatch = new CreateMatchService();
//   const match = await createMatch.execute({
//     match_id,
//   });

//   return response.json(match);
// });

//= ===========================================================================>

export default matchesRouter;
