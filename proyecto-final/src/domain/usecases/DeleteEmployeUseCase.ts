import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";

class DeleteEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employeeId: number;
    constructor(employeeId: number) {
        this._employeeId = employeeId;
    }

    async execute(): Promise<void> {
        return this.employeeRepository.delete(this._employeeId);
    }
}

export default DeleteEmployeesUseCase
