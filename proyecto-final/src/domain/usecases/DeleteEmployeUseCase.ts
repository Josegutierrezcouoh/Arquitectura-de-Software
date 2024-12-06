import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";

/**
 * Caso de uso para eliminar empleados.
 */
class DeleteEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employeesId: number[];

    /**
     * Constructor de la clase DeleteEmployeesUseCase.
     * @param employeeId - El ID del empleado a eliminar.
     */
    constructor(employeesId: number[]) {
        this._employeesId = employeesId;
    }

    /**
     * Ejecuta el caso de uso para eliminar un empleado.
     * @returns Una promesa que se resuelve cuando el empleado ha sido eliminado.
     */
    async execute(): Promise<void> {
        const deletePromises = this._employeesId.map(employeeId => 
            this.deleteEmployee(employeeId)
        );
        await Promise.all(deletePromises);
    }

    private deleteEmployee(employeeId: number): Promise<void> {
        return this.employeeRepository.delete(employeeId);
    }
}

export default DeleteEmployeesUseCase
