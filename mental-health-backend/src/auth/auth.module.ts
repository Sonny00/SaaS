import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module'; 
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importer ConfigModule et ConfigService

@Module({
  imports: [
    ConfigModule.forRoot(), // Charger les variables d'environnement
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importer ConfigModule dans JwtModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: 'tonSecretJWT', // Récupérer JWT_SECRET via ConfigService
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
