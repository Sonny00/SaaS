import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class AnonymousMessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: createMessageDto,
    });
  }

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto,
    });
  }

  async remove(id: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.prisma.message.delete({
      where: { id },
    });
  }
}
