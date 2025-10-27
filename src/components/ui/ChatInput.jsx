import { useEffect, useRef, useContext, useState, useCallback } from "react"
import Button from "./Button"
import { BiImageAdd } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { IoMdSend } from "react-icons/io"
import { chatsContext } from "../../context/chatsContext"
import { getGroqChatCompletion } from "../../http"
import usePlaySound from "../../hooks/usePlaySound"
import talk from "../../assets/sounds/talk.ogg"
import npc from "../../assets/sounds/npc.ogg"
import MinecraftPainting from "../icons/MinecraftPainting"


const ChatInput = () => {
  const ctx = useContext(chatsContext)
  const { isLoading, setIsLoading, newMessage, createNewChat } = ctx
  const inputRef = useRef()
  const { playSound : playTalk } = usePlaySound(talk)
  const { playSound : playNpc } = usePlaySound(npc)

  const onSubmit = useCallback(async () => {
    if (!inputRef.current) return
    if (isLoading) return
    const value = inputRef.current.value
    if (!value) return

    playTalk()
    
    if (!ctx.curChat) {
      if (!inputRef.current) return
      inputRef.current.value = ""
      
      setIsLoading(true)
      const err = await createNewChat(value)
      setIsLoading(false)
      playNpc() 
    } else {
      const updatedMessages = [
        ...ctx.getChat().messages,
        {
          role : "user" ,
          content : value
        },
      ]
      ctx.newMessage("user", value)
      inputRef.current.value = ""
      setIsLoading(true)
      const data = await getGroqChatCompletion(updatedMessages)
      setIsLoading(false)
      
      if (!data.success) return console.log("An error occured!")
      playNpc()
        
      newMessage("assistant", data.content)
    }
    }, [ctx, isLoading])
    
    useEffect(() => {
      const onEnter = e => {
        if (e.keyCode === 13 && document.activeElement === inputRef.current) {
          onSubmit()
        }
    }
    document.addEventListener("keydown", onEnter)
    return () => { 
        document.removeEventListener("keydown", onEnter)
    }
  }, [onSubmit])


  return (
    <span className="w-full bg-slate-200 px-10 py-2 flex justify-between items-center border-2 border-black">
        <input ref={inputRef} className="flex-1 focus:outline-none text-lg font-semibold" placeholder="Enter prompt here"/>
        <Button icon>
            <MinecraftPainting />
        </Button>
        <Button icon>
            <FaMicrophone />
        </Button>
        <Button icon onClick={onSubmit} disabled={isLoading}>
            <IoMdSend />
        </Button>
    </span>
  )
}

export default ChatInput