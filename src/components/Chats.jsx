import React, { useContext } from 'react'
import ChatMessage from './ui/ChatMessage'
import { chatsContext } from '../context/chatsContext'

const Chats = ({ messages }) => {
  const ctx = useContext(chatsContext)
  return (
    <div className="w-full overflow-scroll">
      <ul className="flex flex-col items-center w-full gap-2 flex-1 max-md:text-sm">
          {
              messages.map((msg, index) => (
                  <ChatMessage key={index} msg={msg} />
                )) 
              }
          {
              ctx.isLoading && <li className="max-w-full px-4 py-2 self-start text-3xl">
                ...
              </li>
          }
      </ul>
    </div>
  )
}

export default Chats