import React from 'react'

const InputComponent = (props) => {
  return (
    <>
       
       <input type={props.type} name={props.name} id={props.id} placeholder={props.placeholder} 
       
        className='w-full h-10 focus:outline-none border border-gray-500 px-2 '

        onClick={props.onClick}
       />

       <label htmlFor="name"

       >Full Name</label>
    
    
    </>
  )
}

export default InputComponent