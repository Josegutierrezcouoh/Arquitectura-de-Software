import Employee from '@/domain/entities/Employee';
import React, { useState } from 'react'

interface EmployeeFormProps {
    employee?: Employee;
    onSubmit: (employee: Employee) => void;
}

interface EmployeeDTO  {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
    const [currentEmployee, setCurrentEmployee] = useState<EmployeeDTO>( { id: employee?.id || 0, name: employee?.name || '', email: employee?.email || '', phone:  employee?.phone || '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentEmployee((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <form className='flex flex-col gap-4' action="">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={currentEmployee.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={currentEmployee.email}
                onChange={handleChange}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={currentEmployee.phone}
                onChange={handleChange}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit(new Employee(currentEmployee.name, currentEmployee.email, currentEmployee.phone, currentEmployee.id));
                }}
            >
                {employee ? 'Update' : 'Add'} Employee
            </button>
        </form>
    )
}

export default EmployeeForm