import Tag from 'src/entities/tag.entity';
import Users from 'src/entities/user.entity';

export default class CreateUserTagDto {
  user: Users;
  tag: Tag;
}
