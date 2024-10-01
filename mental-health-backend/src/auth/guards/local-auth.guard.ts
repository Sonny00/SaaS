import { Injectable, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service'; 
import { isObservable } from 'rxjs';

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

    const attempts = await this.authService.getLoginAttempts(email);
    const MAX_ATTEMPTS = 5;
    if (attempts >= MAX_ATTEMPTS) {
      throw new UnauthorizedException('Too many login attempts. Please try again later.');
    }

    const canActivate = super.canActivate(context);

    // Gérer les différents types de retour
    if (isObservable(canActivate)) {
      return canActivate.toPromise(); // Convertir l'Observable en Promise
    }

    return Promise.resolve(canActivate); // Assurez-vous que c'est une Promise
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
