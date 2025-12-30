import React from 'react'
import SuggestionBtn from './ui/SuggestionBtn'

const Suggestions = () => {
  return (
    <div className="flex flex-col gap-5 mt-10 items-start justify-center">
        <h1 className="max-[400px]:text-4xl text-5xl font-bold font-mc-ten">How can I help you today?</h1>
        <div className="w-full h-75 grid max-[400px]:grid-cols-1 max-md:grid-cols-2 grid-cols-4 p-3 max-sm:p-1 gap-3">
            <SuggestionBtn content="Teach me how to build an iron farm." />
            <SuggestionBtn content="Give me some tips on speedrunning Minecraft." />
            <SuggestionBtn content="Create a build plan for my new megastructure" />
            <SuggestionBtn content="How do I get mending?" />
        </div>
    </div>
  )
}

export default Suggestions