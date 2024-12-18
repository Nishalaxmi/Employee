import { Employee } from 'src/entity/employee.entity';
export declare class EmployeeDto {
    id: number;
    firstname: string;
    lastname: string;
    address?: string;
    number?: string;
    state?: string;
    country?: string;
    city?: string;
    email: string;
    position?: string;
    role?: string;
    status?: string;
    createdAt?: Date;
    updated_at?: Date;
    constructor(employee: Employee);
}
