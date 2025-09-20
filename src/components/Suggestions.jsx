import React from 'react'
import SuggestionBtn from './ui/SuggestionBtn'

const Suggestions = () => {
  return (
    <div className="flex flex-col gap-5 mt-10 items-start justify-center">
        <h1 className="text-5xl font-bold ">How can I help you today?</h1>
        <div className="w-full h-75 grid grid-cols-4 p-3 gap-3">
            <SuggestionBtn content="Teach me how to build an iron farm." />
            <SuggestionBtn content="Give me some tips on speedrunning Minecraft." />
            <SuggestionBtn content="Create a build plan for my new megastructure" />
            <SuggestionBtn content="How do I get mending?" />
        </div>
    </div>
  )
}

export default Suggestions