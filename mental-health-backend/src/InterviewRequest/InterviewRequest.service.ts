import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/src/prisma.service';
import { InterviewRequest } from '@prisma/client';
import { CreateInterviewRequestDto } from './dto/create-interview-request.dto';
import { UpdateInterviewRequestDto } from './dto/update-interview-request.dto';

@Injectable()
export class InterviewRequestService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInterviewRequestDto): Promise<InterviewRequest> {
    return this.prisma.interviewRequest.create({ data });
  }

  async findAll(): Promise<InterviewRequest[]> {
    return this.prisma.interviewRequest.findMany();
  }

  async findOne(id: string): Promise<InterviewRequest | null> {
    return this.prisma.interviewRequest.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateInterviewRequestDto: UpdateInterviewRequestDto,
  ): Promise<InterviewRequest> {
    return this.prisma.interviewRequest.update({
      where: { id },
      data: updateInterviewRequestDto,
    });
  }

  async remove(id: string): Promise<InterviewRequest> {
    return this.prisma.interviewRequest.delete({ where: { id } });
  }
}
