import React from 'react'

const Overlap = ({ children, isShowing, onClose }: Readonly<{
    children: React.ReactNode;
    isShowing: boolean;
    onClose: () => void;
}>) => {
    return (
        <div className={`${isShowing ? '' : 'hidden'}`}>
            <div
                onClick={onClose}
                className='bg-gray-500 w-screen h-screen fixed top-0 left-0 z-10 opacity-50 '
            />
            <div
                className=' bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-10 rounded'
            >
                {children}
            </div>
        </div>

    )
}


export default Overlap