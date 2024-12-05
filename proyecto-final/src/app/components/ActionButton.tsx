import React from 'react'

interface ActionButtonProps {
    onClick: () => void;
    color: string;
    disabled?: boolean;
    children: React.ReactNode;
}
const ActionButton: React.FC<ActionButtonProps> = ({ onClick, color, disabled = false, children }) => {
    return (
        <button
            className={`block py-2 px-10 bg-${color}-500 text-white font-bold rounded ${disabled ? 'opacity-50' : `hover:bg-${color}-700`}`}
            onClick={onClick}

            disabled={disabled}
        >
            {children}
        </button>
    )
}


export default ActionButton