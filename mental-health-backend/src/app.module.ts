import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/src/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { EmailModule } from './emailService/email.module'; 
import { InterviewRequestModule } from './InterviewRequest/InterviewRequest.module'; 
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EmployeeModule, 
    EmailModule,
    InterviewRequestModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
