"use client"
import React from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon, Volume2 , VolumeX} from 'lucide-react'
import { useTheme } from 'next-themes'
import {usePreferences} from "@/store/usePreferences"
import {useSound} from "use-sound";
const PreferencesTab = () => {
    const {setTheme} = useTheme();
    const [playmusic] = useSound("/sounds/mouse-click.mp3");
    const [playSoundOn] = useSound("/sounds/sound-on.mp3");
    const [playSoundOff] = useSound("/sounds/sound-off.mp3")
    const {soundEnabled , setSoundEnabled}=usePreferences();
  return (
    <div className='flex flex-wrap gap-2  px-1 md:px-2'>
        <Button variant={"outline"} size={"icon"} onClick={()=>{setTheme("light")
           soundEnabled && playmusic()
        }}>
            <SunIcon className='size-[1.2rem] text-muted-foreground'></SunIcon>
        </Button>
        
        <Button variant={"outline"} size={"icon"} onClick={()=>{setTheme("dark")
           soundEnabled && playmusic()
        }}>
            <MoonIcon className='size-[1.2rem] text-muted-foreground'></MoonIcon>
        </Button>
        
        <Button variant={"outline"} size={"icon"} onClick={()=>{setSoundEnabled(!soundEnabled) }}>
           {soundEnabled ?<Volume2 className='size-[1.2rem] text-muted-foreground'></Volume2> :<VolumeX className='size-[1.2rem] text-muted-foreground'></VolumeX>}
        </Button>
    </div>
  )
}

export default PreferencesTab