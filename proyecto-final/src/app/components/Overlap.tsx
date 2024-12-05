import React from 'react'

const Overlap = ({ children, isShowing, onClose }: Readonly<{
    children: React.ReactNode;
    isShowing: boolean;
    onClose: () => void;
  }>)  => {
  return (
    <div className={`${isShowing ? '' : 'hidden'}`}>
        <div onClick={onClose} className='bg-gray-500 opacity-50 z-50'/>
        <div className='bg-white p-5 z-51'>
            {children}
        </div>
    </div>
        
    )
}


export default Overlap