import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

class GetEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());

    constructor() { }

    async execute(): Promise<Employee[]> {
        const results = await this.employeeRepository.getAll()
        results.forEach(employee => {console.log(employee)})
        return results; 
    }
}

export default GetEmployeesUseCase
