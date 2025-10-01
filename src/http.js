import axios from "axios"
const apiKey = import.meta.env.VITE_GROQ_API_KEY

export const getGroqChatCompletion = async (messages) => {
  const data = await axios.post("https://api.groq.com/openai/v1/chat/completions", 
    {
      "model": "llama-3.3-70b-versatile",
      "messages": messages
    },
    {
      headers : {
        "Authorization" : `Bearer ${apiKey}`,
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })

  return data
}
