import React from 'react'

const Button = ({onclick, style, text, loading}) => {
  return (
    <div>
        <button onClick={onclick} className={style}>{loading ? "Loading..." : text}</button>
    </div>
  )
}

export default Button