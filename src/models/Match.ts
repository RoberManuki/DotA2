import { Entity, PrimaryColumn } from 'typeorm';

//= ===========================================================================>

@Entity('matches')
class Match {
  @PrimaryColumn()
  match_id: number;
}

//= ===========================================================================>

export default Match;
