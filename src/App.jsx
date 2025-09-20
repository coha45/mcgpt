import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

const App = () => {
  return (
    <div className="bg-neutral-100 flex">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App