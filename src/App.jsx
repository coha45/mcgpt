import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import MobileSidebar from './components/MobileSidebar'

const App = () => {
  return (
    <div className="bg-neutral-100 flex font-mc-regular">
      <MobileSidebar />
      <Sidebar />
      <Main />
    </div>
  )
}

export default App