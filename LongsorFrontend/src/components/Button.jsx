import React from 'react'

const Button = ({onClick, children, color, full}) => {
  return (
    <button onClick={onClick} className={`${color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-600 hover:bg-lime-700'} text-white p-2 px-4 ${full && 'w-full'} rounded-lg`}>{children}</button>
  )
}

export default Button