import { Module } from '@nestjs/common';
import { InterviewRequestService } from './InterviewRequest.service';
import { InterviewRequestController } from './InterviewRequest.controller';
import { PrismaService } from '../../prisma/src/prisma.service';

@Module({
  controllers: [InterviewRequestController],
  providers: [InterviewRequestService, PrismaService],
})
export class InterviewRequestModule {}
