import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/core/application/@shared/interfaces/jwt/jwt.interface';
import type { TokenServiceInterface } from 'src/core/application/@shared/interfaces/token/token.service.interface';
import { TOKEN_SERVICE_INTERFACE } from 'src/core/application/@shared/interfaces/token/token.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE_INTERFACE)
    private readonly tokenService: TokenServiceInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Token is Missing');

    try {
      const payload =
        await this.tokenService.verifyToken<AccessTokenPayload>(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
