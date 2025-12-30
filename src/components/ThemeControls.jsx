import React from 'react'
import Button from './ui/Button'

const ThemeControls = ({ active }) => {
  return (
    <ul className="flex flex-col w-full">
        <li>
            <Button icon full>
                <i class="hn hn-themes"></i>
                { active && "Theme" } 
            </Button>
        </li>
        <li>
            <Button icon full>
                <i class="hn hn-music-solid"></i>
                { active && "Music" } 
            </Button>
        </li>
    </ul>
  )
}

export default ThemeControls