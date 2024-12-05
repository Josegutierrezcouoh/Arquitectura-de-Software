'use client'
import { useEffect, useState } from "react";
import Overlap from "./Overlap";
import Employee from "@/domain/entities/Employee";
import EmployeeForm from "./EmployeeForm";
import GetEmployeesUseCase from "@/domain/usecases/GetEmployeesUseCase";
import ActionButton from "./ActionButton";

enum OverlapViewIds {
    AddEmployee,
    EditEmployee,
}

type OverlapView =
    | { id: OverlapViewIds.AddEmployee }
    | { id: OverlapViewIds.EditEmployee, employee: Employee };

const HomeContent = () => {
    // Estado inicial con datos simulados
    const [employees, setEmployees] = useState<Employee[]>([

    ]);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isShowing, setIsShowing] = useState(false);
    const [currentOverlapView, setCurrentOverlapView] = useState<OverlapView | null>(null);

    const getAll = async () => {
        const useCase = new GetEmployeesUseCase();
        setEmployees(await useCase.execute())
    }

    const handleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === employees.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(employees.map((employee) => employee.id));
        }
    };

    const handleDeleteSelected = () => {
        setEmployees(employees.filter((employee) => !selectedIds.includes(employee.id)));
        setSelectedIds([]);
    };

    const deleteOne = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    }

    const handleEditEmployee = (employee: Employee) => {
        setEmployees(employees.map((e) => (e.id === employee.id ? employee : e)));
        setIsShowing(false)
    }

    const getOverlapView = () => {
        if (currentOverlapView && currentOverlapView.id === OverlapViewIds.AddEmployee) {
            return <EmployeeForm
                onSubmit={(employee) => {
                    setEmployees([...employees, employee]);
                    setIsShowing(false);
                    setCurrentOverlapView(null);
                }}
            />
        }
        if (currentOverlapView?.employee) {
            return (
                <EmployeeForm
                    employee={currentOverlapView.employee}
                    onSubmit={handleEditEmployee}
                />
            )
        }

    }

    const tableButtons = () => {
        return (
            <div className="flex flex-row w-full justify-end gap-4">
                <ActionButton onClick={handleDeleteSelected} color="red" disabled={selectedIds.length === 0}>
                    <p>Delete</p>
                </ActionButton>
                <ActionButton onClick={() => {
                    setIsShowing(true);
                    setCurrentOverlapView({ id: OverlapViewIds.AddEmployee });
                }}
                    color="green"
                >
                    <p>Add Employee</p>
                </ActionButton>
            </div>
        )
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className="bg-white flex flex-col text-black min-h-screen gap-5 p-5">
            <Overlap isShowing={isShowing} onClose={() => { setIsShowing(false); setCurrentOverlapView(null) }}>
                {getOverlapView()}
            </Overlap>
            <h1 className="flex items w-full justify-center">Manage Employees</h1>
            {tableButtons()}
            <table className="w-full text-black ">
                <thead>
                    <tr className="boder-b border-black">
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedIds.length === employees.length}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {employees.map((employee, index) => (
                        <tr key={employee.id} className='border-b border-black bg-red' style={{ backgroundColor: `${index % 2 == 0 ? '#d2d4d2' : 'white'}`, textAlign: "center" }}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(employee.id)}
                                    onChange={() => handleSelect(employee.id)}
                                />
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <button onClick={() => {
                                    setIsShowing(true);
                                    setCurrentOverlapView({ id: OverlapViewIds.EditEmployee, employee });
                                }} style={{ marginRight: "0.5rem" }}>✏️</button>
                                <button onClick={() => { deleteOne(employee.id) }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default HomeContent;