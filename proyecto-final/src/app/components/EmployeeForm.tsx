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
        const { name, value } = e.target
        if (name === 'phone' && value.length >= 11) { return }
        setCurrentEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const classes = 'w-full border-2 border-blue-200 p-1 rounded-md hover:border-blue-500 focus:outline-none focus:border-blue-500';
    const isDisabled = currentEmployee.name === '' || currentEmployee.email === '' || currentEmployee.phone.length != 10 ;
    return (
        <form className='flex flex-col gap-4' action="">
            <input
                type="text"
                name="name"
                placeholder="Name"
                className={classes}
                value={currentEmployee.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className={classes}
                value={currentEmployee.email}
                onChange={handleChange}
            />
            <input
                type="number"
                name="phone"
                placeholder="Phone"
                className={classes}
                value={currentEmployee.phone}
                onChange={handleChange}
            />
            <button
                className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDisabled}
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