import { createContext, useState } from 'react'
import { getGroqChatCompletion, getNewTitle } from '../http'

export const chatsContext = createContext({
    curChat : null,
    chats : [],
    isLoading : null,
    setIsLoading : () => {}, 
    setCurChat : () => {},
    createNewChat : async () => {},
    deleteChat : () => {},
    getChat : () => {},
    newMessage : async () => {}
})

const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([])
  const [curChat, setCurChat] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const createNewChat = async (initialMsg) => {
    const chat = {
      role : "user",
      content : initialMsg
    }
  
    const newChat = {
      id : Math.random().toString(36).substring(2),
      title : "New Chat",
      messages : [chat, {
        role : "system",
        content : `You as the assistant are an adventurer named 'Steve' set in the world of minecraft. You should know that the user speaks in the contexts of a minecraft world." + 
        Your responses should be bubbly and short. When adding flare to your responses use default HTML tags! Also when rendering lists use the <ul> or <ol> depending on the use case
        also please <br>'s to separate logical items`
      }]
    }
    setChats(prevChats => [newChat, ...prevChats])
    setCurChat(newChat.id)

    // response
    const initialResponse = await getGroqChatCompletion([chat])

    if (!initialResponse.success) return { success : false, message : "An error occured!" }

    newMessage("assistant", initialResponse.content, newChat.id)

    return { success : true }
  }

  const deleteChat = () => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== curChat))
    setCurChat(null)
  }

  const getChat = (id) => {
    return chats.find(chat => chat.id === curChat || id)
  }

  const setChatTitle = async (id, messages) => {
    getNewTitle(messages).then(data => {
      console.log(data)
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === (id || curChat) ?
          { ...chat, title : response.content } :
              chat
      ))
    }).catch(err => console.log("ERROR UHH: ", err))
  }

  const newMessage = (role, content, id) => {
    setChats(prevChats => prevChats.map(chat => 
        chat.id === (id || curChat) ?
        { ...chat, messages : [...chat.messages, { role, content }]} :
            chat
    ))
  }
  
  const ctxValue = {
    curChat,
    setCurChat,
    chats,
    createNewChat,
    deleteChat,
    getChat,
    newMessage,
    isLoading,
    setIsLoading
  }

  return (
    <chatsContext.Provider value={ctxValue}>
        { children }
    </chatsContext.Provider>
  )
}

export default ChatsProvider