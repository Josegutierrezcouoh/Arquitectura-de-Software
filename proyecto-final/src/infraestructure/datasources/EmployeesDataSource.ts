import EmployeesDataSourceProtocol from "@/domain/datasources/EmployeesDataSourcesProtocol";
import Employee from "@/domain/entities/Employee";
import EmployeeDAO from "../models/EmployeeDAO";

/**
 * Fuente de datos para empleados que implementa el protocolo EmployeesDataSourceProtocol.
 */
class EmployeesDataSource implements EmployeesDataSourceProtocol {
    private employees: Employee[] = [];

    /**
     * Obtiene todos los empleados almacenados en la base de datos.
     * @returns Una promesa que resuelve con un array de empleados.
     */
    async getAll(): Promise<Employee[]> {
        if (this.employees.length > 0) {
            return []
        }
        const results = await EmployeeDAO.getAll()
        results.forEach(employeeDAO => {
            if (employeeDAO.id) {
                const employee = new Employee(employeeDAO.name, employeeDAO.email, employeeDAO.phone, employeeDAO.id)
                this.employees.push(employee)
            }
            
        })

        return this.employees
    }

    /**
     * Obtiene un empleado específico por su ID.
     * @param id - El ID del empleado a buscar.
     * @returns Promesa que resuelve con el empleado encontrado.
     * @throws Error si el empleado no se encuentra.
     */
    async get(id: number): Promise<Employee> {
        const employeeDAO = await EmployeeDAO.get(id);
        if (employeeDAO.id === undefined) {
            throw new Error('Employee not found')
        }
        return new Employee(employeeDAO.name, employeeDAO.email, employeeDAO.phone, employeeDAO.id)
    }

    /**
     * Agrega un nuevo empleado a la base de datos.
     * @param employee - El empleado a agregar.
     * @returns Promesa que resuelve con el empleado agregado.
     * @throws Error si no se puede agregar el empleado.
     */
    async add(employee: Employee): Promise<Employee> {
        const newEmployeeDAO = new EmployeeDAO(employee.name, employee.email, employee.phone);
        await newEmployeeDAO.add();
        
        if (!newEmployeeDAO.id) {
            throw new Error('Employee not found')
        }

        return new Employee(newEmployeeDAO.name, newEmployeeDAO.email, newEmployeeDAO.phone, newEmployeeDAO.id)
    }

    /**
     * Actualiza un empleado existente en la base de datos.
     * @param employee - El empleado con los datos actualizados.
     * @returns Promesa que se resuelve cuando la actualización se completa.
     */
    async update(employee: Employee): Promise<void> {
        const employeeDAO = new EmployeeDAO(employee.name, employee.email, employee.phone, employee.id);
        await employeeDAO.update();
    }
    /**
     * Elimina un empleado de la base de datos.
     * @param id - El ID del empleado a eliminar.
     * @returns Promesa que se resuelve cuando la eliminación se completa.
     */
    async delete(id: number): Promise<void> {
        const employeeDAO = await EmployeeDAO.get(id);
        await employeeDAO.delete();
    }
    
}

export default EmployeesDataSource