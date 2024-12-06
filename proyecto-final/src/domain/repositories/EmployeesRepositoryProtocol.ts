import Employee from "@/domain/entities/Employee";

interface EmployeesRepositoryProtocol {
    getAll(): Promise<Employee[]>;
    get(id: number): Promise<Employee>;
    add(employee: Employee): Promise<Employee>;
    update(employee: Employee): Promise<void>;
    delete(id: number): Promise<void>;
}

export default EmployeesRepositoryProtocol