import axios from "axios"
const apiKey = import.meta.env.VITE_GROQ_API_KEY

export const getGroqChatCompletion = async (messages) => {
  try {
    const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", 
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
    const data = response.data.choices[0].message.content
    return {
      content : data,
      success : true
    }
  } catch(err) {
    return ({
      message : "An error occured when fetching a response",
      success : false
    })
  }
}

export const getNewTitle = async (messages) => {
  try {
    console.log(messages)
    const response = await getGroqChatCompletion([
      ...messages,
      {
        role : "system",
        content : `If the message is a generic greeting or casual conversation, return an empty string. But once a relevant topic rises return an actual title 
        for the conversation. For example: an interaction of Hello or Hi would return an empty string, but an interaction of "Help me with my math homework" 
        would return a title like "Math homework help", or a user asking about the difference between Circles and Squares would result in a title of 
        Circles vs Squares. All titles must be minimalistic.`
      }
    ])

    console.log("RESPONSE CHECK: ", response)

    if (!response.success) throw new Error(response.message)

    const { content : title } = response.content

    if (!title) throw new Error("An error occured")
    return {
      content: title,
      success : true
    }
  } catch(err) {
    console.log("ERROR WHILE FETCHING TITLE: ", err)
    return {
      message : "An error occured while fetching title",
      success : false
    }
  }
}