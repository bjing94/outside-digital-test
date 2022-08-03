import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Tag from './tag.entity';
import Users from './user.entity';

@Entity()
export default class UserTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user: Users) => user.userTags, {
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Tag, (tag: Tag) => tag.userTags, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
