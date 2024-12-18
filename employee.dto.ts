import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsIn,
} from 'class-validator';
import { Employee } from 'src/entity/employee.entity';

export class EmployeeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  number?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updated_at?: Date;
  constructor(employee: Employee) {
    this.id = employee.id;
    this.firstname = employee.firstname;
    this.email = employee.email;
    this.position = employee.position;
    this.address = employee.address;
    this.city = employee.city;
    this.country = employee.country;
    this.lastname = employee.lastname;
    this.role = employee.role;
    this.status = employee.status;
    this.state = employee.state;
    this.number = employee.number;
    this.createdAt = employee.created_at;
    this.updated_at = employee.updated_at;
  }
}
