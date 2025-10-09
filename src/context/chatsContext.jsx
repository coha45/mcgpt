import { createContext, useState } from 'react'
import { getGroqChatCompletion } from '../http'

export const chatsContext = createContext({
    curChat : null,
    chats : [],
    setCurChat : () => {},
    createNewChat : async () => {},
    deleteChat : () => {},
    getChat : () => {},
    newMessage : async () => {}
})

const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([])
  const [curChat, setCurChat] = useState(null)
  
  const createNewChat = async (initialMsg) => {
    const chat = {
      role : "user",
      content : initialMsg
    }

    const newChat = {
      id : Math.random().toString(36).substring(2),
      title : Math.random().toString(10).substring(2),
      messages : [chat, {
          role : "system",
          content : `You as the assistant are an adventurer named 'Steve' set in the world of minecraft. You should know that the user speaks in the contexts of a minecraft world." + 
            Your responses should be bubbly and short. When adding flare to your responses use default HTML tags! Also when rendering lists use the <ul> or <ol> depending on the use case
            also please <br>'s to separate logical items`
        }]
    }
    setChats(prevChats => [newChat, ...prevChats])
    setCurChat(newChat.id)
    const initialResponse = await getGroqChatCompletion([chat])
    newMessage("assistant", initialResponse.data.choices[0].message.content, newChat.id)
    return newChat.id
  }

  const deleteChat = () => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== curChat))
  }

  const getChat = () => {
    return chats.find(chat => chat.id === curChat)
  }

  const newMessage = (role, content, id) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === (id || curChat) ?
        { ...chat, messages : [...chat.messages, { role, content }]} :
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