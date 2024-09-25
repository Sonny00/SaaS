import { Injectable, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service'; 

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { email, password } = request.body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    if (request.isAuthenticated()) {
      throw new UnauthorizedException('User is already authenticated');
    }

    const attempts = await this.authService.getLoginAttempts(email);
    const MAX_ATTEMPTS = 5;
    if (attempts >= MAX_ATTEMPTS) {
      throw new UnauthorizedException('Too many login attempts. Please try again later.');
    }

    return super.canActivate(context) as Promise<boolean>; // Assurez-vous que le type de retour est Promise<boolean>
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
