import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AnonymousMessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('anonymous-messages')
export class AnonymousMessagesController {
  constructor(private readonly messagesService: AnonymousMessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
