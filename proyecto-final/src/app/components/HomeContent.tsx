'use client'
import { useState } from "react";
import Overlap from "./Overlap";

enum OverlapView {
    AddEmployee,
    EditEmployee,
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

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isShowing, setIsShowing] = useState(false);
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

    const handleDeleteSelected = () => {
        setEmployees(employees.filter((employee) => !selectedIds.includes(employee.id)));
        setSelectedIds([]);
    };

    const deleteOne = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    }

    return (
        <div className="bg-white flex flex-col text-black min-h-screen gap-5 p-5">
            <Overlap isShowing={isShowing} onClose={() => setIsShowing(false)}>
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl">Add New Employee</h1>
                    <input type="text" placeholder="Name" className="p-2 border border-black" />
                    <input type="email" placeholder="Email" className="p-2 border border-black" />
                    <input type="tel" placeholder="Phone" className="p-2 border border-black" />
                    <button className="block py-2 px-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                        Add Employee
                    </button>
                </div>
            </Overlap>
            <h1 className="flex items w-full justify-center">Manage Employees</h1>
            <div className="flex flex-row w-full justify-end gap-4">
                <button
                    className={`block py-2 px-10 bg-red-500 text-white font-bold rounded ${selectedIds.length === 0 ? 'opacity-50' : 'hover:bg-red-700'}`}
                    onClick={handleDeleteSelected}

                    disabled={selectedIds.length === 0}
                >
                    Delete
                </button>
                <button className="block py-2 px-10 bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                    Add New Employee
                </button>
            </div>
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
                                <button style={{ marginRight: "0.5rem" }}>✏️</button>
                                <button onClick={() => {deleteOne(employee.id)}}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeContent;