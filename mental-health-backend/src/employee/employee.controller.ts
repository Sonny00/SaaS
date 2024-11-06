import { Controller, Post, Body, Get, Param, Patch, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { EmployeeService } from './employee.service'; 
import { CreateEmployeeDto } from './dto/create-employee.dto'; // Assure-toi d'avoir un DTO pour créer un employé
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeeService.create(createEmployeeDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.employeeService.remove(id);
      return { message: `Employee with ID ${id} successfully deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
