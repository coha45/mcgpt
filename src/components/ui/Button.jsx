import clsx from 'clsx'
import React from 'react'

const Button = ({ icon, full, bg, children, ...props }) => {
  return (
    <button className={clsx( 
        "py-2 px-3 cursor-pointer rounded-lg font-semibold bg-transparent hover:bg-slate-300 flex items-center justify-start gap-2",
        icon && "text-black",
        !icon && "text-gray-500",
        full && "w-full",
        bg && "bg-slate-300"
    )} { ...props } >
        { children }
    </button>
  )
}

export default Button