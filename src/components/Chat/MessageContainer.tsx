import React from 'react'
import ChatTopbar from './ChatTopbar'
import MessageList from './MessageList'
import ChatBottomBar from './ChatBottomBar'

const MessageContainer = () => {
  return (
   
    <div className='flex flex-col justify-between w-full h-full'>
         <ChatTopbar></ChatTopbar>
         <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
             <MessageList></MessageList>
             <ChatBottomBar></ChatBottomBar>
         </div>
    </div>
  )
}

export default MessageContainer