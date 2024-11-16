import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { InterviewRequestService } from './InterviewRequest.service';
import { CreateInterviewRequestDto } from './dto/create-interview-request.dto';
import { UpdateInterviewRequestDto } from './dto/update-interview-request.dto'; 

@Controller('interview-requests')
export class InterviewRequestController {
  constructor(private readonly interviewRequestService: InterviewRequestService) {}

  @Post()
  create(@Body() createInterviewRequestDto: CreateInterviewRequestDto) {
    return this.interviewRequestService.create(createInterviewRequestDto);
  }

  @Get()
  findAll() {
    return this.interviewRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewRequestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewRequestDto: UpdateInterviewRequestDto) {
    return this.interviewRequestService.update(id, updateInterviewRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewRequestService.remove(id);
  }
}
