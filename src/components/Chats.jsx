import React from 'react'
import ChatMessage from './ui/ChatMessage'

const Chats = ({ messages }) => {
  return (
    <ul className="flex flex-col items-center w-full gap-2 max-h-2xl overflow-y-scroll">
        {
            messages.map((msg, index) => (
                <ChatMessage key={index} msg={msg} />
            )) 
        }
    </ul>
  )
}

export default Chats