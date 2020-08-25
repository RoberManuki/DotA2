import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

// import Detail from './Detail';

//= ===========================================================================>

@Entity('matches')
class Match {
  // @OneToOne(() => Detail, detail => detail.match_id, {
  //   eager: true,
  // })
  // @JoinColumn()
  @PrimaryColumn()
  match_id: number;

  // Foreign Key: 1 Match --> 1 Detail
  // @OneToOne(() => Detail, detail => detail.hero_id, {
  //   eager: true,
  // })
  // @JoinColumn()
  @Column()
  hero_id: number;

  // --------------------------------------------------->
  // Match props
  @Column()
  duration: number;

  @Column()
  game_mode: number;

  @Column()
  radiant_score: number;

  @Column()
  dire_score: number;

  @Column()
  replay_url: string;
}

//= ===========================================================================>

export default Match;
