import { confirmAccount } from '@/api/authAPI'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'

const AccountConfirmation = () => {
  const [value, setValue] = useState('')

  const handleChange = (v : string) => {
    setValue(v)
  }

  const {mutate} = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data : string) => {
      toast.success(data)
    }
  })

  const handleComplete = (v : string) => {
    console.log("The verification code is:", v)
    mutate(v)

    setValue('')
  }

  return (
    <>
      <p
        className='text-white font-thin text-xl'
      >Enter the confirmation code below to verify your account:</p>
      <div className='flex gap-2 justify-center'>
        <PinInput
          value={value}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
          <PinInputField 
            className='w-10 h-10 rounded-md border border-slate-400 text-center'
          />          
        </PinInput>
      </div>
    </>
  )
}

export default AccountConfirmation
