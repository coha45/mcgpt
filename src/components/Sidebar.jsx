import { useState } from 'react'
import Button from './ui/Button'
import { FiMenu } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { useContext } from 'react';
import { chatsContext } from '../context/chatsContext';

import clsx from 'clsx';
import MinecraftBarrier from './icons/MinecraftBarrier';
import MinecraftWritableBook from './icons/MinecraftWritableBook';
import MinecraftArrow from './icons/MinecraftArrow';

const Sidebar = ({ active }) => {
  const [isActive, setIsActive] = useState(!!active)
  const ctx = useContext(chatsContext)

  function toggle() {
    setIsActive(prevState => !prevState)
  }

  function handleChatCreation() {
    ctx.setCurChat(null)
  }

  return (
    <aside className={clsx("p-2 bg-slate-200 min-h-screen hidden lg:flex flex-col gap-4 border-r-4 border-r-slate-300", 
        !isActive && "w-15 items-center",
        isActive && "w-[250px] items-start"
    )}>
        <ul className="w-full">
            <li>
                <Button icon onClick={toggle}>
                    {
                        !isActive ?
                        <MinecraftArrow /> :
                        <MinecraftBarrier />
                    }
                </Button>
            </li>
            
            <li className="mt-6 w-full">
                
                <Button full bg onClick={handleChatCreation}>
                    <MinecraftWritableBook />
                    { isActive && "New Chat" }
                </Button>
            </li>
        </ul>
        {
            isActive &&
            <ul className="flex flex-col gap-2 text-sm w-full">
                {
                    ctx.chats.map(chat => (
                        <li key={chat.id}>
                            <Button onClick={() => ctx.setCurChat(chat.id)} full>
                                { chat.title }
                            </Button>
                        </li>
                    ))
                }
            </ul>
        }
    </aside>
  )
}

export default Sidebar