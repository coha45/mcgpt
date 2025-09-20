import { useState } from 'react'
import Button from './ui/Button'
import { FiMenu } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { useContext } from 'react';
import { chatsContext } from '../context/chatsContext';

import clsx from 'clsx';

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
    <aside className={clsx("p-2 bg-slate-200 min-h-screen hidden lg:flex flex-col gap-4", 
        !isActive && "w-15 items-center",
        isActive && "w-50 items-start"
    )}>
        <ul className="w-full">
            <li>
                <Button icon onClick={toggle}>
                    {
                        !isActive ?
                        <FiMenu /> :
                        <HiX />
                    }
                </Button>
            </li>
            
            <li className="mt-6 w-full">
                
                <Button full bg onClick={handleChatCreation}>
                    <FaEdit />
                    { isActive && "New Chat" }
                </Button>
            </li>
        </ul>
        {
            isActive &&
            <ul className="flex flex-col gap-2">
                {
                    ctx.chats.map(chat => (
                        <li>
                            <Button onClick={() => ctx.setCurChat(chat.id)}>
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