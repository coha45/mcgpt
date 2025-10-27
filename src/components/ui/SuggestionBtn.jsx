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
    const err = await ctx.createNewChat(content)
    ctx.setIsLoading(false)
    playNpc()
  }

  return (
    <button onClick={createChat} className="flex items-start justify-start text-left 
    h-full bg-slate-200 hover:bg-slate-300 cursor-pointer p-2">
        { content }
    </button>
  )
}

export default SuggestionBtn