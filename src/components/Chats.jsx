import React, { useContext } from 'react'
import ChatMessage from './ui/ChatMessage'
import { chatsContext } from '../context/chatsContext'

const Chats = ({ messages }) => {
  const ctx = useContext(chatsContext)
  return (
    <ul className="flex flex-col items-center w-full gap-2 max-h-2xl overflow-y-scroll">
        {
            messages.map((msg, index) => (
                <ChatMessage key={index} msg={msg} />
              )) 
            }
        {
            ctx.isLoading && <li className="max-w-full px-4 py-2 break-words self-start text-3xl">
              ...
            </li>
        }
    </ul>
  )
}

export default Chats