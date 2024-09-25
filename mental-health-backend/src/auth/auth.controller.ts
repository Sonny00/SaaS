import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // Guard pour valider les identifiants locaux
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Guard pour protéger les routes avec JWT

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Endpoint pour l'inscription d'un nouvel utilisateur
  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    const user = await this.userService.createUser(body.email, body.password);
    return { message: 'User registered successfully', user };
  }

  // Endpoint pour la connexion et l'obtention d'un token JWT
  @UseGuards(LocalAuthGuard) // Utilisation du guard pour vérifier les identifiants
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Exemple d'endpoint protégé par JWT
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected resource', user: req.user };
  }
}
