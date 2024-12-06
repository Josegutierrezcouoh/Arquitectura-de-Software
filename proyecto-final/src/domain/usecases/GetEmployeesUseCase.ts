import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

/**
 * Caso de uso para obtener empleados.
 */
class GetEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());

    /**
     * Constructor de la clase GetEmployeesUseCase.
     */
    constructor() { }

    /**
     * Ejecuta el caso de uso para encontrar un empleado.
     * @returns Una promesa que se resuelve con el empleado encontrado.
     */
    async execute(): Promise<Employee[]> {
        const results = await this.employeeRepository.getAll()
        return results; 
    }
}

export default GetEmployeesUseCase
