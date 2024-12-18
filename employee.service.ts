import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDto } from 'src/dto/employee.dto';
import { PageOptionsDto, PaginatedEmployeeDto } from 'src/dto/pagOptionsDto';

import { Employee } from 'src/entity/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  // async findAll() {
  //   return this.employeeRepository.find();
  // }

  // async getEmployees(
  //   pageOptions: PageOptionsDto,
  //   search: string = '',
  // ): Promise<PaginatedEmployeeDto> {
  //   const { page, take, keyword, order, skip } = pageOptions;

  //   const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

  //   if (search && search.trim() !== '') {
  //     const sanitizedSearchText = search.trim().toLowerCase();
  //     queryBuilder
  //       .where('LOWER(employee.firstname) LIKE :searchText', {
  //         searchText: `%${sanitizedSearchText}%`,
  //       })
  //       .orWhere('LOWER(employee.lastname) LIKE :searchText', {
  //         searchText: `%${sanitizedSearchText}%`,
  //       })
  //       .orWhere('LOWER(employee.position) LIKE :searchText', {
  //         searchText: `%${sanitizedSearchText}%`,
  //       })
  //       .orWhere('LOWER(employee.status) LIKE :searchText', {
  //         searchText: `%${sanitizedSearchText}%`,
  //       })
  //       .orWhere('LOWER(employee.role) LIKE :searchText', {
  //         searchText: `%${sanitizedSearchText}%`,
  //       });
  //   }

  //   if (keyword && keyword.trim() !== '') {
  //     const sanitizedKeywordText = keyword.trim().toLowerCase();
  //     queryBuilder
  //       .andWhere('LOWER(employee.firstname) LIKE :keywordText', {
  //         keywordText: `%${sanitizedKeywordText}%`,
  //       })
  //       .orWhere('LOWER(employee.lastname) LIKE :keywordText', {
  //         keywordText: `%${sanitizedKeywordText}%`,
  //       })
  //       .orWhere('LOWER(employee.email) LIKE :keywordText', {
  //         keywordText: `%${sanitizedKeywordText}%`,
  //       });
  //   }

  //   queryBuilder.orderBy(
  //     'employee.firstname',
  //     order === 'ASC' ? 'ASC' : 'DESC',
  //   );

  //   queryBuilder.skip(skip).take(take);

  //   const [employees, totalCount] = await queryBuilder.getManyAndCount();

  //   return new PaginatedEmployeeDto(
  //     employees.map((employee) => new EmployeeDto(employee)),
  //     totalCount,
  //   );
  // }

  // async getEmployeesWithPagination(
  //   paginationDto: PageOptionsDto,
  // ): Promise<{ data: Employee[]; totalCount: number }> {
  //   const { page, take, search } = paginationDto;

  //   const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

  //   if (search && search.trim() !== '') {
  //     queryBuilder.andWhere('LOWER(employee.firstname) LIKE :search', {
  //       search: `%${search.trim().toLowerCase()}%`,
  //     });
  //     queryBuilder.orWhere('LOWER(employee.lastname) LIKE :search', {
  //       search: `%${search.trim().toLowerCase()}%`,
  //     });
  //     queryBuilder.orWhere('LOWER(employee.position) LIKE :search', {
  //       search: `%${search.trim().toLowerCase()}%`,
  //     });
  //     queryBuilder.orWhere('LOWER(employee.email) LIKE :search', {
  //       search: `%${search.trim().toLowerCase()}%`,
  //     });
  //   }

  //   const skip = (page - 1) * take;
  //   queryBuilder.skip(skip).take(take);
  //   queryBuilder.orderBy('employee.createdAt', 'DESC');
  //   queryBuilder.orderBy('employee.updated_at', 'DESC');
  //   const [data, totalCount] = await queryBuilder.getManyAndCount();

  //   return { data, totalCount };
  // }

  async getEmployeesWithPagination(
    paginationDto: PageOptionsDto,
  ): Promise<{ data: Employee[]; totalCount: number; page: number }> {
    let { page, take, search } = paginationDto;

    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    // Handle search functionality
    if (search && search.trim() !== '') {
      queryBuilder.andWhere('LOWER(employee.firstname) LIKE :search', {
        search: `%${search.trim().toLowerCase()}%`,
      });
      queryBuilder.orWhere('LOWER(employee.lastname) LIKE :search', {
        search: `%${search.trim().toLowerCase()}%`,
      });
      queryBuilder.orWhere('LOWER(employee.position) LIKE :search', {
        search: `%${search.trim().toLowerCase()}%`,
      });
      queryBuilder.orWhere('LOWER(employee.email) LIKE :search', {
        search: `%${search.trim().toLowerCase()}%`,
      });
    }

    // Pagination logic
    const skip = (page - 1) * take;
    queryBuilder.skip(skip).take(take);

    // Order by creation and modification times
    queryBuilder.orderBy('employee.createdAt', 'DESC');
    queryBuilder.addOrderBy('employee.updatedAt', 'DESC');

    // Execute query to get paginated employees and total count
    const [data, totalCount] = await queryBuilder.getManyAndCount();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / take);

    // If current page exceeds total pages, set page to the last valid page
    if (page > totalPages) {
      page = totalPages; // Adjust page to the last page
    }

    // Return the paginated data along with total count and adjusted page
    return { data, totalCount, page };
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({ id });
  }

  async create(data: EmployeeDto) {
    return await this.employeeRepository.save(data);
  }

  async update(id: number, updateEmployeeDto: EmployeeDto): Promise<Employee> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  delete(id: number): Promise<void> {
    return this.employeeRepository.delete(id).then(() => undefined);
  }
}
