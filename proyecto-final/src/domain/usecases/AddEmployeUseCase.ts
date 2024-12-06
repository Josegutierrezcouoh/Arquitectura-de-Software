import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "../entities/Employee";

class AddEmployeeUseCase {
    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employee: Employee;

    constructor(employee: Employee) {
        this._employee = employee;
    }

    async execute(): Promise<Employee> {
        return this.employeeRepository.add(this._employee);
    }
}

export default AddEmployeeUseCase