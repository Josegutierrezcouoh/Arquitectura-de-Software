import EmployeesRepository from "@/infraestructure/repositories/EmployeeRepository";
import EmployeesRepositoryProtocol from "../repositories/EmployeesRepositoryProtocol";
import EmployeesDataSource from "@/infraestructure/datasources/EmployeesDataSource";
import Employee from "../entities/Employee";

/**
 * Protocolo para la fuente de datos de empleados.
 */
class AddEmployeeUseCase {
    private employeeRepository: EmployeesRepositoryProtocol = new EmployeesRepository(new EmployeesDataSource());
    private _employee: Employee;

    /**
     * Constructor de la clase de datos de empleados para
     * @param employee empleado a agregar
     */
    constructor(employee: Employee) {
        this._employee = employee;
    }

    /**
    * Agrega un nuevo empleado
     * @returns una promesa con el nuevo usario agregado
     */
    async execute(): Promise<Employee> {
        return this.employeeRepository.add(this._employee);
    }
}

export default AddEmployeeUseCase