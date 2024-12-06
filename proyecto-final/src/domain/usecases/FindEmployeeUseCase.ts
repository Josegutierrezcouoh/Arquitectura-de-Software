import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

/**
     * Ejecuta el caso de uso para eliminar un empleado.
     * @returns Una promesa que se resuelve cuando el empleado ha sido eliminado.
     */
class FindEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employeeId: number;

    /**
     * Constructor de la clase FindEmployeesUseCase.
     * @param employeeId - El ID del empleado a encontrar.
     */
    constructor(employeeId: number) {
        this._employeeId = employeeId;
    }

    /**
     * Ejecuta el caso de uso para encontrar un empleado.
     * @returns Una promesa que se resuelve con el empleado encontrado.
     */
    async execute(): Promise<Employee> {
        return this.employeeRepository.get(this._employeeId);
    }
}

export default FindEmployeesUseCase
