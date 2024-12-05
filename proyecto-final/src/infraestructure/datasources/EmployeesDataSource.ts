import EmployeesDataSourceProtocol from "@/domain/datasources/EmployeesDataSourcesProtocol";
import Employee from "@/domain/entities/Employee";
import EmployeeDAO from "../models/EmployeeDAO";

class EmployeesDataSource implements EmployeesDataSourceProtocol {
    private employees: Employee[] = [];

    async getAll(): Promise<Employee[]> {
        if (this.employees.length > 0) {
            return Promise.resolve(this.employees);
        }
        const results = await EmployeeDAO.getAll()
        this.employees = results.map((employeeDAO) => {
            return new Employee(employeeDAO.name, employeeDAO.email, employeeDAO.phone, employeeDAO.id);
        })
        return this.employees
    }
    async get(id: number): Promise<Employee> {
        const employeeDAO = await EmployeeDAO.get(id);
        return new Employee(employeeDAO.name, employeeDAO.email, employeeDAO.phone, employeeDAO.id)
    }
    async add(employee: Employee): Promise<void> {
        const newEmployeeDAO = new EmployeeDAO(employee.name, employee.email, employee.phone);
        await newEmployeeDAO.add();
    }
    async update(employee: Employee): Promise<void> {
        const employeeDAO = new EmployeeDAO(employee.name, employee.email, employee.phone, employee.id);
        await employeeDAO.update();
    }
    async delete(id: number): Promise<void> {
        const employeeDAO = await EmployeeDAO.get(id);
        await employeeDAO.delete();
    }
    
}

export default EmployeesDataSource