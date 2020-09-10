//= ===========================================================================>
import { getRepository } from 'typeorm';

import Match from '../models/Match';
import HeroUsage from '../models/HeroUsage';
import AppError from '../errors/AppError';

//= ===========================================================================>
interface ResponseDTO {
  wins: number;
  losses: number;
  percentWins: string;
  picks: Array<HeroUsage>;
}

//= ===========================================================================>
class ProcessDataService {
  public async execute(): Promise<ResponseDTO> {
    const matchRepository = getRepository(Match);

    const [winsVector, wins] = await matchRepository.findAndCount({
      where: { win: 1 },
    });
    const [lossesVector, losses] = await matchRepository.findAndCount({
      where: { win: 0 },
    });

    const matchesVector = winsVector.concat(lossesVector);

    const winsPercent = (wins * 100) / matchesVector.length;

    const percentWins = `${winsPercent}%`;

    const heroUsageVector: Array<HeroUsage> = [];

    try {
      matchesVector.map(match => {
        const heroUsageExists = heroUsageVector.find(
          e => e.hero_id === match.hero_id,
        );
        if (!heroUsageExists) {
          const heroUsage = new HeroUsage(match.hero_id);
          heroUsageVector.push(heroUsage);
        } else {
          heroUsageExists.times_used += 1;
        }
      });
      return { wins, losses, percentWins, picks: heroUsageVector };
    } catch {
      throw new AppError('Error at heroUsage?', 400);
    }
  }
}

//= ===========================================================================>

export default ProcessDataService;
