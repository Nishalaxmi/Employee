"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("../entity/employee.entity");
const typeorm_2 = require("typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async getEmployeesWithPagination(paginationDto) {
        let { page, take, search } = paginationDto;
        const queryBuilder = this.employeeRepository.createQueryBuilder('employee');
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
        const skip = (page - 1) * take;
        queryBuilder.skip(skip).take(take);
        queryBuilder.orderBy('employee.createdAt', 'DESC');
        queryBuilder.addOrderBy('employee.updatedAt', 'DESC');
        const [data, totalCount] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalCount / take);
        if (page > totalPages) {
            page = totalPages;
        }
        return { data, totalCount, page };
    }
    findOne(id) {
        return this.employeeRepository.findOneBy({ id });
    }
    async create(data) {
        return await this.employeeRepository.save(data);
    }
    async update(id, updateEmployeeDto) {
        await this.employeeRepository.update(id, updateEmployeeDto);
        return this.findOne(id);
    }
    delete(id) {
        return this.employeeRepository.delete(id).then(() => undefined);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map