import clsx from 'clsx'
import React from 'react'
import usePlaySound from '../../hooks/usePlaySound'
import btnClick from "../../assets/sounds/minecraft_click.mp3"


const Button = ({ icon, full, bg, children, playSnd = true, onClick = () => {}, ...props }) => {
  const { playSound } = usePlaySound(btnClick)
  const handleClick = () => {
    if (playSnd) playSound()
    onClick()
  }

  return (
    <button className={clsx( 
        "py-2 px-3 cursor-pointer rounded-lg font-semibold bg-transparent hover:bg-slate-300 flex items-center justify-start gap-2 text-sm text-left",
        icon && "text-black",
        !icon && "text-gray-500",
        full && "w-full",
        bg && "bg-slate-300"
    )} onClick={handleClick} { ...props } >
        { children }
    </button>
  )
}

export default Button