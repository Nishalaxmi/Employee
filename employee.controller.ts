import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entity/employee.entity';
import { EmployeeDto } from 'src/dto/employee.dto';
import { PageOptionsDto, PaginatedEmployeeDto } from 'src/dto/pagOptionsDto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Get('/get-employee')
  // findAll(): Promise<Employee[]> {
  //   return this.employeeService.findAll();
  // }

  // @Get('/get-employyees')
  // async getEmployees(
  //   @Query() pageOptionsDto: PageOptionsDto,
  //   @Query('search') search: string = '',
  // ): Promise<{ data: EmployeeDto[]; totalCount: number }> {
  //   return await this.employeeService.getEmployees(pageOptionsDto, search);
  // }

  @Get('/pagination')
  async getEmployees(
    @Query() paginationDto: PageOptionsDto,
  ): Promise<{ data: Employee[]; totalCount: number }> {
    return this.employeeService.getEmployeesWithPagination(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(+id);
  }

  @Post('/create-employee')
  create(@Body() createEmployeeDto: EmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: EmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.employeeService.delete(+id);
  }
}
