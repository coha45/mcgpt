import { useEffect, useRef, useContext, useState } from "react"
import Button from "./Button"
import { BiImageAdd } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { IoMdSend } from "react-icons/io"
import { chatsContext } from "../../context/chatsContext"
import { getGroqChatCompletion } from "../../http"


const ChatInput = () => {
  const [isLoading, setIsLoading] = useState(false)
  const ctx = useContext(chatsContext)
  const inputRef = useRef()

  async function onSubmit() {
    if (isLoading) return
    const value = inputRef.current.value
    if (!value) return

    if (!ctx.curChat) {
      await ctx.createNewChat(value)
      inputRef.current.value = ""
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
      const response = await getGroqChatCompletion(updatedMessages)
      setIsLoading(false)
      ctx.newMessage("assistant", response.data.choices[0].message.content)
    }
  }

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
    <span className="w-full bg-slate-200 px-10 py-2 flex justify-between items-center rounded-full">
        <input ref={inputRef} className="flex-1 focus:outline-none text-lg font-semibold" placeholder="Enter prompt here"/>
        <Button>
            <BiImageAdd />
        </Button>
        <Button>
            <FaMicrophone />
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
            <IoMdSend />
        </Button>
    </span>
  )
}

export default ChatInput