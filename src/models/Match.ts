import { Entity, PrimaryColumn, Column } from 'typeorm';

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

  // --------------------------------------------------->
  // Players[] details

  @Column()
  camps_stacked: number;

  @Column()
  damage: number;

  @Column()
  kills: number;

  @Column()
  deaths: number;

  @Column()
  assists: number;

  @Column()
  denies: number;

  @Column()
  gold: number;

  @Column()
  gold_per_min: number;

  @Column()
  xp_per_min: number;

  @Column()
  hero_damage: number;

  @Column()
  tower_damage: number;

  @Column()
  obs_placed: number;

  @Column()
  sen_placed: number;

  @Column()
  win: number;

  @Column()
  personaname: string;
}

//= ===========================================================================>

export default Match;
