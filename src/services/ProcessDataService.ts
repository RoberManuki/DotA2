//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Match from '../models/Match';
import HeroUsage from '../models/HeroUsage';

//= ===========================================================================>
// Interfaces
interface ResponseDTO {
  wins: number;
  losses: number;
  picks: Array<HeroUsage>;
}

//= ===========================================================================>
class ProcessDataService {
  public async execute(): Promise<ResponseDTO> {
    const matchRepository = getRepository(Match);

    // get the count of wins and losses (W/L)
    // const --> wins, losses
    // to do -> get % of wins
    const [winsVector, wins] = await matchRepository.findAndCount({
      where: { win: 1 },
    });
    const [lossesVector, losses] = await matchRepository.findAndCount({
      where: { win: 0 },
    });
    // ------------------------------------------------------------------------>

    // totalMatches = winsMatches + lossesMatches
    const matchesVector = winsVector.concat(lossesVector);
    // ------------------------------------------------------------------------>

    // get heroes usage
    // const --> usageVector
    const usageVector: Array<HeroUsage> = [];
    matchesVector.map(match => {
      if (!usageVector.find(e => e.hero_id === match.hero_id)) {
        // eslint-disable-next-line no-new
        const heroUsage = new HeroUsage(match.hero_id);
        usageVector.push(heroUsage);
      } else if (usageVector.find(e => e.hero_id === match.hero_id)) {
        const heroUsage = usageVector.find(e => e.hero_id === match.hero_id);
        heroUsage?.times_used += 1;
      } else {
        throw new AppError('Error at heroes usage -> 401?', 401);
      }
    });
    // ------------------------------------------------------------------------>

    //
    return { wins, losses, picks: usageVector };
  }
}

//= ===========================================================================>

export default ProcessDataService;
