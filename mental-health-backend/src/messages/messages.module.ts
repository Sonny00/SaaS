import { Module } from '@nestjs/common';
import { AnonymousMessagesService } from './messages.service';
import { AnonymousMessagesController } from './messages.controller';
import { PrismaService } from '../../prisma/src/prisma.service';

@Module({
  providers: [AnonymousMessagesService, PrismaService],
  controllers: [AnonymousMessagesController],
  exports: [AnonymousMessagesService],
})
export class MessagesModule {}
