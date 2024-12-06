import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "@/domain/entities/Employee";

/**
 * Caso de uso para actualizar empleados.
 */
class UpdateEmployeesUseCase {

    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employee: Employee;

    /**
     * Constructor de la clase
     * @param employee empleado a actualizar
     */
    constructor(employee: Employee) {
        this._employee = employee;
    }

    /**
     * Ejecuta el caso de uso para actualizar un empleado.
     * @returns Una promesa que se resuelve cuando el empleado ha sido actualizado.
     */
    async execute(): Promise<void> {
        return this.employeeRepository.update(this._employee);
    }
}

export default UpdateEmployeesUseCase
