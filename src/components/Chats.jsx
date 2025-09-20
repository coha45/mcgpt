import React from 'react'
import ChatMessage from './ui/ChatMessage'

const Chats = ({ messages }) => {
  return (
    <ul className="flex flex-col items-center w-full gap-2">
        {
            messages.map((msg, index) => (
                <ChatMessage key={index} msg={msg} />
            )) 
        }
    </ul>
  )
}

export default Chats