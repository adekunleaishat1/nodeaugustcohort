import React from 'react'

const Input = ({type, sty,change , placeholder, name}) => {
  return (
    <div>
        <input name={name} onChange={change} className={sty} type={type} placeholder={placeholder} />
    </div> 
  )
}

export default Input