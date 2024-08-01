import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import React from 'react'

const AuthButtons = () => {
  return (
     <div className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'>
       <RegisterLink className='flex-1'>
         <Button className='w-full' variant={"outline"}>
            Sign up
         </Button>
         </RegisterLink>
         <LoginLink className='flex-1'>
         <Button className='w-full'>Login</Button>
         </LoginLink>
     </div>
  )
}

export default AuthButtons