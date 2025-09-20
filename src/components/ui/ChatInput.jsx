import { useEffect, useRef, useContext } from "react"
import Button from "./Button"
import { BiImageAdd } from "react-icons/bi"
import { FaMicrophone } from "react-icons/fa"
import { IoMdSend } from "react-icons/io"
import { chatsContext } from "../../context/chatsContext"


const ChatInput = () => {
  const ctx = useContext(chatsContext)
  const inputRef = useRef()

  function onSubmit() {
    const value = inputRef.current.value
    if (!value) return

    if (!ctx.curChat) {
        console.log(ctx.curChat)
        ctx.createNewChat(value)
      } else {
        console.log("Supasdasd")
        ctx.newMessage("user", value)
    }
    inputRef.current.value = ""
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
        <Button onClick={onSubmit}>
            <IoMdSend />
        </Button>
    </span>
  )
}

export default ChatInput