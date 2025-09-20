import React from 'react'
import { useContext } from 'react'
import { chatsContext } from '../../context/chatsContext'

const SuggestionBtn = ({ content }) => {
  const ctx = useContext(chatsContext)

  function createChat() {
    ctx.createNewChat(content)
  }

  return (
    <button onClick={createChat} className="flex items-start justify-start text-left 
    h-full bg-slate-200 hover:bg-slate-300 cursor-pointer p-2">
        { content }
    </button>
  )
}

export default SuggestionBtn