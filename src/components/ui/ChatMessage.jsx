import clsx from 'clsx'
import React from 'react'

const ChatMessage = ({ msg }) => {
  return (["user", "assistant"].includes(msg.role) && msg.message) && (
    <li className={clsx("max-w-full px-4 py-2 break-words",
            msg.role == "user" && "self-end bg-slate-200",
            msg.role == "assistant" && "self-start mb-10"
        )}>
            { msg.message }
    </li>
  )
}

export default ChatMessage