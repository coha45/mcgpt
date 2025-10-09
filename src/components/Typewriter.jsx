import { useState, useEffect } from "react"
import DOMpurify from "dompurify"

const Typewriter = ({ content, speed = 40 }) => {
  const [text, setText] = useState("")
  useEffect(() => {
    setText("")
    let i = 0;
    const interval = setInterval(() => {
        setText(prevText => DOMpurify.sanitize(prevText.concat(content.charAt(i))))
        i++ 
        if (i >= content.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [content, speed])

  return (
    <span dangerouslySetInnerHTML={{ __html : DOMpurify.sanitize(text)}}></span>
  )
}

export default Typewriter