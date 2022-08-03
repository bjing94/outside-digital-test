import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserTag from './user-tag.entity';
import Users from './user.entity';

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  creator: Users;

  @Column({ length: 40 })
  name: string;

  @Column({ default: 0 })
  sortOrder: number;

  @OneToMany(() => UserTag, (userTag: UserTag) => userTag.tag)
  userTags: UserTag[];
}
