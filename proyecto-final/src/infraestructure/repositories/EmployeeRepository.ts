import EmployeesDataSourceProtocol from "@/domain/datasources/EmployeesDataSourcesProtocol";
import Employee from "@/domain/entities/Employee";
import EmployeesRepositoryProtocol from "@/domain/repositories/EmployeesRepositoryProtocol";

class EmployeesRepository implements EmployeesRepositoryProtocol {

    private dataSource: EmployeesDataSourceProtocol;

    constructor(dataSource: EmployeesDataSourceProtocol) {
        this.dataSource = dataSource;
    }

    async getAll(): Promise<Employee[]> {
        return this.dataSource.getAll();
    }
    async get(id: number): Promise<Employee> {
        return this.dataSource.get(id);
    }
    async add(employee: Employee): Promise<Employee> {
        return this.dataSource.add(employee);
    }
    async update(employee: Employee): Promise<void> {
        return this.dataSource.update(employee);
    }
    async delete(id: number): Promise<void> {
        return this.dataSource.delete(id);
    }

}

export default EmployeesRepository