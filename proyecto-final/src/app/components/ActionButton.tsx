import React from 'react'

interface ActionButtonProps {
    onClick: () => void;
    color: 'green' | 'red' | 'blue';
    disabled?: boolean;
    children: React.ReactNode;
}
const ActionButton: React.FC<ActionButtonProps> = ({ onClick, color, disabled = false, children }) => {
    const baseClasses = 'block py-2 px-10 text-white font-bold rounded';
    const colorClasses = {
        green: 'bg-green-500 hover:bg-green-700',
        red: 'bg-red-500 hover:bg-red-700',
        blue: 'bg-blue-500 hover:bg-blue-700',
    };
    return (
        <button
            className={`${baseClasses} ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}

            disabled={disabled}
        >
            {children}
        </button>
    )
}


export default ActionButton