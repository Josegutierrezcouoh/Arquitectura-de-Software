import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

class UpdateEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employee: Employee;
    constructor(employee: Employee) {
        this._employee = employee;
    }

    async execute(): Promise<void> {
        return this.employeeRepository.update(this._employee);
    }
}

export default UpdateEmployeesUseCase
