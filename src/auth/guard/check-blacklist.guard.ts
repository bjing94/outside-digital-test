import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BlacklistService } from 'src/blacklist/blacklist.service';

@Injectable()
export default class CheckBlacklistGuard implements CanActivate {
  constructor(
    @Inject(BlacklistService)
    private readonly blacklistService: BlacklistService,
  ) {}

  //   Проверяем на наличие токена в черном списке для разлогинов
  async canActivate(context: ExecutionContext) {
    let request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
      return true;
    }
    const isInBlacklist = await this.blacklistService.checkBlackList(token);
    return !isInBlacklist;
  }
}
