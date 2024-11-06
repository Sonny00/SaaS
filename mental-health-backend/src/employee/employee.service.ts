import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/src/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createEmployeeDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists'); // Lancer une exception de conflit
    }

    const defaultPassword = createEmployeeDto.password || 'defaultPassword'; // Mot de passe par défaut
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    return await this.prisma.user.create({
      data: {
        email: createEmployeeDto.email,
        role: createEmployeeDto.role || 'USER', 
        password: hashedPassword, 
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // Met à jour un employé existant
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        email: updateEmployeeDto.email,
      },
    });
  }

  // Supprime un employé
  async remove(id: string): Promise<void> {
    // Vérifie si l'employé existe avant de tenter la suppression
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Supprime l'employé si trouvé
    await this.prisma.user.delete({
      where: { id: id },
    });
  }

  // Obtenir tous les employés
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
