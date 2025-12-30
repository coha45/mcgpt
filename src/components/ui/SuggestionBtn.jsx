import React from 'react'
import { useContext } from 'react'
import { chatsContext } from '../../context/chatsContext'
import talk from "../../assets/sounds/talk.ogg"
import npc from "../../assets/sounds/npc.ogg"
import usePlaySound from '../../hooks/usePlaySound'

const SuggestionBtn = ({ content }) => {
  const ctx = useContext(chatsContext)
  const { playSound : playTalk } = usePlaySound(talk)
  const { playSound : playNpc } = usePlaySound(npc)

  async function createChat() {
    playTalk() 
    ctx.setIsLoading(true)
    const newChat = await ctx.createNewChat(content)
    ctx.setIsLoading(false)
    if(!newChat.success) return
    playNpc()
  }

  return (
    <button onClick={createChat} className="flex items-start justify-start text-left 
    flex-1 bg-slate-200 hover:bg-slate-300 cursor-pointer p-2 max-sm:text-sm">
        { content }
    </button>
  )
}

export default SuggestionBtn