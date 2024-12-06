import Employee from "@/domain/entities/Employee";

/**
 * Protocolo para la fuente de datos de empleados.
 */
interface EmployeesDataSourceProtocol {
    /**
     * Obtiene todos los empleados.
     * @returns Una promesa que resuelve con una lista de empleados.
     */
    getAll(): Promise<Employee[]>;

    /**
     * Obtiene un empleado por su ID.
     * @param id - El ID del empleado.
     * @returns Una promesa que resuelve con el empleado.
     */
    get(id: number): Promise<Employee>;

    /**
     * Agrega un nuevo empleado.
     * @param employee - El empleado a agregar.
     * @returns Una promesa que resuelve con el empleado agregado.
     */
    add(employee: Employee): Promise<Employee>;

    /**
     * Actualiza un empleado existente.
     * @param employee - El empleado a actualizar.
     * @returns Una promesa que resuelve cuando la actualización se completa.
     */
    update(employee: Employee): Promise<void>;

    /**
     * Elimina un empleado por su ID.
     * @param id - El ID del empleado a eliminar.
     * @returns Una promesa que resuelve cuando la eliminación se completa.
     */
    delete(id: number): Promise<void>;
}

export default EmployeesDataSourceProtocol