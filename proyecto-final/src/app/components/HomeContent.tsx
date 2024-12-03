'use client'
import { useState } from "react";


interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
}


const HomeContent = () => {
    // Estado inicial con datos simulados
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: "Thomas Hardy", email: "thomashardy@mail.com", phone: "(171) 555-2222" },
        { id: 2, name: "Dominique Perrier", email: "dominiqueperrier@mail.com", phone: "(313) 555-5735" },
        { id: 3, name: "Maria Anders", email: "mariaanders@mail.com", phone: "(503) 555-9931" },
        { id: 4, name: "Fran Wilson", email: "franwilson@mail.com", phone: "(206) 619-5731" },
        { id: 5, name: "Martin Blank", email: "martinblank@mail.com", phone: "(480) 631-2097" },
    ]);

    // Estado para rastrear las filas seleccionadas
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Funciones para manejar la selección
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

    // Función para borrar empleados seleccionados
    const handleDeleteSelected = () => {
        setEmployees(employees.filter((employee) => !selectedIds.includes(employee.id)));
        setSelectedIds([]);
    };

    return (
        <div  className="bg-white text-black min-h-screen items center justify-center p-5">
            <h1 className="items w-full center">Manage Employees</h1>
            <div className="flex flex-row w-full items right">
                <button className="block py-2 px-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                    Add New Employee
                </button>
                <button
                    style={{ backgroundColor: "red", color: "white", padding: "0.5rem" }}
                    onClick={handleDeleteSelected}
                    disabled={selectedIds.length === 0}
                >
                    Delete
                </button>
            </div>
            <table className="container bg-white text-black ">
                <thead>
                    <tr className="border-black">
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
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} style={{ textAlign: "center" }}>
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
                                <button style={{ marginRight: "0.5rem" }}>✏️</button>
                                <button>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeContent;