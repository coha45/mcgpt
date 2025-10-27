import React from 'react'
import { createContext } from 'react'

export const themeContext = createContext({
    theme : "",
    setTheme : () => {}
})

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default")

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
        { children }
    </themeContext.Provider>
  )
}

export default ThemeProvider