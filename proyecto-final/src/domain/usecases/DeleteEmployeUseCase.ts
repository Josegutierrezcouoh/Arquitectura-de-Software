import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";

/**
 * Caso de uso para eliminar empleados.
 */
class DeleteEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employeeId: number;

    /**
     * Constructor de la clase DeleteEmployeesUseCase.
     * @param employeeId - El ID del empleado a eliminar.
     */
    constructor(employeeId: number) {
        this._employeeId = employeeId;
    }

    /**
     * Ejecuta el caso de uso para eliminar un empleado.
     * @returns Una promesa que se resuelve cuando el empleado ha sido eliminado.
     */
    async execute(): Promise<void> {
        return this.employeeRepository.delete(this._employeeId);
    }
}

export default DeleteEmployeesUseCase
