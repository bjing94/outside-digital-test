import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Blacklist {
  @PrimaryColumn('text')
  token: string;
}
