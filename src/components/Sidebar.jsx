import { useState } from 'react'
import Button from './ui/Button'
import { useContext } from 'react';
import { chatsContext } from '../context/chatsContext';
import clsx from 'clsx';
import ThemeControls from './ThemeControls';

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
    <aside className={clsx("p-2 bg-slate-200 min-h-screen max-h-screen hidden lg:flex flex-col justify-between gap-4 border-r-4 border-r-slate-300", 
        !isActive && "w-15 items-center",
        isActive && "w-[250px] items-start"
    )}>
        <ul className="w-full">
            <li>
                <Button icon onClick={toggle}>
                    {
                        !isActive ?
                        <i class="hn hn-bars"></i> :
                        <i class="hn hn-window-close"></i>
                    }
                </Button>
            </li>
            
            <li className="mt-6 w-full">
                <Button full bg onClick={handleChatCreation}>
                    <i class="hn hn-plus-solid"></i>
                    { isActive && "Create New Chat" }
                </Button>
            </li>
        </ul>
        {
            isActive &&
            <ul className="flex-1 flex flex-col gap-2 text-sm w-full overflow-scroll">
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
        <ThemeControls active={isActive} />
    </aside>
  )
}

export default Sidebar