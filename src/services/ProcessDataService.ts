//= ===========================================================================>
import { getRepository } from 'typeorm';

import Match from '../models/Match';
import HeroUsage from '../models/HeroUsage';
import AppError from '../errors/AppError';

//= ===========================================================================>
interface ResponseDTO {
  wins: number;
  losses: number;
  picks: Array<HeroUsage>;
}

//= ===========================================================================>
class ProcessDataService {
  public async execute(): Promise<ResponseDTO> {
    const matchRepository = getRepository(Match);

    // to do -> get % of wins
    const [winsVector, wins] = await matchRepository.findAndCount({
      where: { win: 1 },
    });
    const [lossesVector, losses] = await matchRepository.findAndCount({
      where: { win: 0 },
    });

    const matchesVector = winsVector.concat(lossesVector);

    const heroUsageVector: Array<HeroUsage> = [];

    try {
      matchesVector.map(match => {
        const checkHeroUsageExists = heroUsageVector.find(
          e => e.hero_id === match.hero_id,
        );
        if (!checkHeroUsageExists) {
          const heroUsage = new HeroUsage(match.hero_id);
          heroUsageVector.push(heroUsage);
        } else {
          checkHeroUsageExists.times_used += 1;
        }
      });
      return { wins, losses, picks: heroUsageVector };
    } catch {
      throw new AppError('Error at heroUsage?', 400);
    }
  }
}

//= ===========================================================================>

export default ProcessDataService;
