import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private loginAttempts: { [email: string]: number } = {};

  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
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
