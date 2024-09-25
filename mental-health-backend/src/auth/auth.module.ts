import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module'; 
import { JwtStrategy } from './jwt.strategy'; // Ta stratégie JWT

@Module({
  imports: [
    UsersModule, // Si tu as besoin d'un module pour gérer les utilisateurs
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Assure-toi d'avoir configuré cette variable d'environnement
      signOptions: { expiresIn: '1h' }, // Durée de validité des tokens
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Si d'autres modules doivent accéder à AuthService
})
export class AuthModule {}
