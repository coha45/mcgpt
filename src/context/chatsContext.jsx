import { createContext, useState } from 'react'

export const chatsContext = createContext({
    curChat : null,
    chats : [],
    setCurChat : () => {},
    createNewChat : () => {},
    deleteChat : () => {},
    getChat : () => {},
    newMessage : () => {}
})

const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([])
  const [curChat, setCurChat] = useState(null)

  const createNewChat = (initialMsg) => {
    const newChat = {
        id : Math.random().toString(36).substring(2),
        title : Math.random().toString(10).substring(2),
        messages : [{
          role : "user",
          message : initialMsg
        }]
    }
    setCurChat(newChat.id)
    setChats(prevChats => [newChat, ...prevChats])
    return newChat.id
  }

  const deleteChat = () => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== curChat))
  }

  const getChat = () => {
    return chats.find(chat => chat.id === curChat)
  }

  const newMessage = (role, message) => {
    setChats(prevChats => 
        prevChats.map(chat => 
            chat.id === curChat ?
            { ...chat, messages : [...chat.messages, { role, message }] } :
            chat
        )
    )
  }
  
  const ctxValue = {
    curChat,
    setCurChat,
    chats,
    createNewChat,
    deleteChat,
    getChat,
    newMessage
  }

  return (
    <chatsContext.Provider value={ctxValue}>
        { children }
    </chatsContext.Provider>
  )
}

export default ChatsProvider