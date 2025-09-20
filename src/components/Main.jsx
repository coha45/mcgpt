import { useContext } from 'react'
import { chatsContext } from '../context/chatsContext';
import Chats from './Chats';
import Suggestions from './Suggestions';
import ChatInput from './ui/ChatInput';

const Main = () => {
  const ctx = useContext(chatsContext)

  return (
    <section className="flex-1">
        <div className="max-w-3xl w-full min-h-screen mx-auto px-3 py-10 flex flex-col items-center justify-between">
            {
                ctx.curChat ?
                <Chats messages={ctx.getChat().messages} /> :
                <Suggestions />
            }
            <ChatInput key={ctx.curChat} />
        </div>
    </section>
  )
}

export default Main