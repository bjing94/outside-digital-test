import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TagService } from '../tag.service';

export default class IsTagOwnerGuard implements CanActivate {
  constructor(@Inject(TagService) private readonly tagService: TagService) {}

  async canActivate(context: ExecutionContext) {
    let request = context.switchToHttp().getRequest();
    let uid = request.user.id;
    let tagId = request.params.id;
    if (!uid || !tagId) {
      throw new BadRequestException();
    }
    const tag = await this.tagService.get(tagId);
    if (!tag) {
      throw new NotFoundException('Тэг не найден');
    }
    if (tag.creator.uid !== uid) {
      throw new UnauthorizedException('Вы не владелец тэга');
    }
    return true;
  }
}
