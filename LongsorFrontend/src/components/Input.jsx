import React from 'react'

const Input = ({ type, placeholder, onChange, label, value}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label >{label}</label>
        <input type={type} placeholder={placeholder} name={label} className='p-2 border border-gray-300 rounded-lg focus:outline-none' onChange={onChange} value={value} />
    </div>
  )
}

export default Input