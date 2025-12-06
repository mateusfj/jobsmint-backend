import { AccessTokenPayload } from 'src/core/application/@shared/interfaces/jwt/jwt.interface';

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}
