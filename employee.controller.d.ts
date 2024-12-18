import { EmployeeService } from './employee.service';
import { Employee } from 'src/entity/employee.entity';
import { EmployeeDto } from 'src/dto/employee.dto';
import { PageOptionsDto } from 'src/dto/pagOptionsDto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getEmployees(paginationDto: PageOptionsDto): Promise<{
        data: Employee[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<Employee>;
    create(createEmployeeDto: EmployeeDto): Promise<EmployeeDto & Employee>;
    update(id: number, updateEmployeeDto: EmployeeDto): Promise<Employee>;
    delete(id: string): Promise<void>;
}
