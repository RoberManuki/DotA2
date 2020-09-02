//= ===========================================================================>
// Imports
import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Match from '../models/Match';

//= ===========================================================================>
// Interfaces
interface ResponseDTO {
  wins: number;
  losses: number;
}

//= ===========================================================================>
class ProcessDataService {
  public async execute(): Promise<ResponseDTO> {
    const matchRepository = getRepository(Match);

    // get the count of wins and losses (W/L)
    const [winsVector, wins] = await matchRepository.findAndCount({
      where: { win: 1 },
    });
    const [lossesVector, losses] = await matchRepository.findAndCount({
      where: { win: 0 },
    });

    // get heroes usage
    winsVector.map(win => {
      console.log('win');
      console.log(win.hero_id);
    });

    // get heroes usage
    lossesVector.map(loss => {
      console.log('loss');
      console.log(loss.hero_id);
    });

    // matchRepository.
    return { wins, losses };
  }
}

//= ===========================================================================>

export default ProcessDataService;
