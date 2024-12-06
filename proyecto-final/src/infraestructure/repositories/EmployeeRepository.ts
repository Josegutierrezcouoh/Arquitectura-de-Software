import EmployeesDataSourceProtocol from "@/domain/datasources/EmployeesDataSourcesProtocol";
import Employee from "@/domain/entities/Employee";
import EmployeesRepositoryProtocol from "@/domain/repositories/EmployeesRepositoryProtocol";

/**
 * Repositorio que implementa las operaciones CRUD para empleados.
 * Esta clase actúa como intermediario entre la capa de dominio y la fuente de datos.
 */
class EmployeesRepository implements EmployeesRepositoryProtocol {

    private dataSource: EmployeesDataSourceProtocol;

    /**
     * Crea una nueva instancia del repositorio de empleados.
     * @param dataSource - Fuente de datos que implementa el protocolo EmployeesDataSourceProtocol
     */
    constructor(dataSource: EmployeesDataSourceProtocol) {
        this.dataSource = dataSource;
    }

    /**
     * Obtiene todos los empleados almacenados.
     * @returns Promesa que resuelve con un array de empleados
     */
    async getAll(): Promise<Employee[]> {
        return this.dataSource.getAll();
    }

    /**
     * Obtiene un empleado específico por su ID.
     * @param id - ID del empleado a buscar
     * @returns Promesa que resuelve con el empleado encontrado
     */
    async get(id: number): Promise<Employee> {
        return this.dataSource.get(id);
    }
    
    /**
     * Agrega un nuevo empleado.
     * @param employee - Empleado a agregar
     * @returns Promesa que resuelve con el empleado agregado
     */
    async add(employee: Employee): Promise<Employee> {
        return this.dataSource.add(employee);
    }

    /**
     * Actualiza los datos de un empleado existente.
     * @param employee - Empleado con los datos actualizados
     * @returns Promesa que se resuelve cuando la actualización se completa
     */
    async update(employee: Employee): Promise<void> {
        return this.dataSource.update(employee);
    }

    /**
     * Elimina un empleado por su ID.
     * @param id - ID del empleado a eliminar
     * @returns Promesa que se resuelve cuando la eliminación se completa
     */
    async delete(id: number): Promise<void> {
        return this.dataSource.delete(id);
    }

}

export default EmployeesRepository