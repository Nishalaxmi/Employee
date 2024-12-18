import { EmployeeDto } from 'src/dto/employee.dto';
import { PageOptionsDto } from 'src/dto/pagOptionsDto';
import { Employee } from 'src/entity/employee.entity';
import { Repository } from 'typeorm';
export declare class EmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    getEmployeesWithPagination(paginationDto: PageOptionsDto): Promise<{
        data: Employee[];
        totalCount: number;
        page: number;
    }>;
    findOne(id: number): Promise<Employee>;
    create(data: EmployeeDto): Promise<EmployeeDto & Employee>;
    update(id: number, updateEmployeeDto: EmployeeDto): Promise<Employee>;
    delete(id: number): Promise<void>;
}
