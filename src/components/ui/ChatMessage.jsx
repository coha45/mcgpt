import clsx from 'clsx'
import { useEffect } from 'react'
import DOMpurify from "dompurify" 

const ChatMessage = ({ msg }) => {
  return (["user", "assistant"].includes(msg.role) && msg.content) && (
    <li className={clsx("max-w-full px-4 py-2 break-words",
            msg.role == "user" && "self-end bg-slate-200",
            msg.role == "assistant" && "self-start mb-10"
        )} dangerouslySetInnerHTML={{__html : DOMpurify.sanitize(msg.content)}}>
    </li>
  )
}

export default ChatMessage