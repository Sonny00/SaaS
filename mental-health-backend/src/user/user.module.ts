import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/src/prisma.service';
import { UserController } from './user.controller';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Utilisation de la clé secrète depuis le fichier .env
      signOptions: { expiresIn: '1h' }, // Le token expire après 1 heure
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService], // Si Prisma est nécessaire
  exports: [UserService],
  // Export du service si d'autres modules en ont besoin
})
export class UsersModule {}
