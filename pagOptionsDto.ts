import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { EmployeeDto } from './employee.dto';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({ type: 'string', default: '' })
  @IsString()
  @IsOptional()
  readonly search?: string;

  @ApiPropertyOptional({ type: 'string', default: '' })
  @IsString()
  @IsOptional()
  readonly keyword?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export class PaginatedEmployeeDto {
  @ApiProperty()
  data: EmployeeDto[];
  @ApiProperty()
  totalCount: number;

  constructor(data: EmployeeDto[], totalCount: number) {
    this.data = data;
    this.totalCount = totalCount;
  }
}
