import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { SmileIcon } from 'lucide-react'
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useTheme } from 'next-themes'
interface EmojiPickerProps {
    onchange : (emoji : String) => void
}
const EmojiPicker = ({onchange} : EmojiPickerProps) => {
    const {theme} = useTheme()
  return (
     <Popover>
        <PopoverTrigger>
            <SmileIcon className='h-5 w-5 text-muted-foreground hover:text-foreground transition'></SmileIcon>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
             <Picker
             emojiSize={18}
             data={data}
             maxFrequentRows={1}
             theme={theme == "dark" ? "dark" : "light"}
             onEmojiSelect={(emoji:any) => onchange(emoji.native)}
             ></Picker>
        </PopoverContent>
     </Popover>
  )
}

export default EmojiPicker