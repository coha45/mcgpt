import { useEffect, useRef } from "react"

const usePlaySound = (source) => {
    const soundRef = useRef(new Audio(source))
    
    const playSound = () => {
        if (soundRef.current) {
            const sound = soundRef.current.cloneNode(true);
            sound.preload = "auto"
            sound.currentTime = 0;
            sound.volume = 1;
            sound.play()
        }
    }

    const pauseSound = () => {
        if(soundRef.current) {
            soundRef.current.pause()
        }
    }
    
    return { playSound, pauseSound }
}

export default usePlaySound