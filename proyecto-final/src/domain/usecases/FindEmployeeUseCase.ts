import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

class FindEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employeeId: number;
    constructor(employeeId: number) {
        this._employeeId = employeeId;
    }

    async execute(): Promise<Employee> {
        return this.employeeRepository.get(this._employeeId);
    }
}

export default FindEmployeesUseCase
