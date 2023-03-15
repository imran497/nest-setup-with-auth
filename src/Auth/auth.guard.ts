import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    try {

      const req: Request = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7, authHeader.length);
        const { username } = this.jwtService.verify(token);
        context.switchToHttp().getRequest().username = username;
        return true
      }

      throw new Error()

    } catch (e) {
      throw new HttpException('Authentication failed', 200)
    }
  }

}
