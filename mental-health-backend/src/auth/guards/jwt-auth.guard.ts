import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    // Appelle la logique de canActivate par défaut
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      throw new UnauthorizedException('User is not authenticated'); // Message d'erreur si non authentifié
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!this.hasAccess(user)) {
      throw new ForbiddenException('Access denied'); // Message d'erreur si l'accès est refusé
    }



    return true; // Autorise l'accès si toutes les vérifications passent
  }

  private hasAccess(user: any): boolean {
    
    return user.role === 'admin' || user.role === 'user'; // Exemple de vérification
  }
}
