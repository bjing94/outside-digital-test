import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserTag from './user-tag.entity';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30, unique: true })
  nickname: string;

  @OneToMany(() => UserTag, (userTag: UserTag) => userTag.user)
  userTags: UserTag[];
}
