import { EmployeeDto } from './employee.dto';
export declare enum Order {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    readonly search?: string;
    readonly keyword?: string;
    get skip(): number;
}
export declare class PaginatedEmployeeDto {
    data: EmployeeDto[];
    totalCount: number;
    constructor(data: EmployeeDto[], totalCount: number);
}
