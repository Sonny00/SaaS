import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { PrismaService } from '../../prisma/src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageStatus } from '@prisma/client'; 
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
    if (updateMessageDto.status && !Object.values(MessageStatus).includes(updateMessageDto.status)) {
      throw new BadRequestException('Statut invalide');
    }
      
    return this.prisma.message.update({
      where: { id },
      data: updateMessageDto, // Assurez-vous que updateMessageDto contient directement le statut (en tant que MessageStatus)
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
