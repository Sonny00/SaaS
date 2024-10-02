import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Assure-toi que le chemin d'importation est correct
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private loginAttempts: { [email: string]: number } = {};

  constructor(
    private readonly userService: UserService, // Ajout de UserService
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.validateUser(email, password); // Appelle la méthode validateUser de UserService
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    // Renvoyer les informations de l'utilisateur avec le token
    return {
    access_token: this.jwtService.sign(payload),
      user: {
        id: user.id, // Renvoie l'id de l'utilisateur
        email: user.email, // Inclut l'email de l'utilisateur
        name: user.name,
      },
    };
  }

  async getLoginAttempts(email: string): Promise<number> {
    return this.loginAttempts[email] || 0;
  }

  async incrementLoginAttempts(email: string): Promise<void> {
    if (!this.loginAttempts[email]) {
      this.loginAttempts[email] = 0;
    }
    this.loginAttempts[email]++;
  }

  async resetLoginAttempts(email: string): Promise<void> {
    this.loginAttempts[email] = 0;
  }
}
  