import { Token } from "@/types/index"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"

type ResetPasswordTokenFormProps = {
  token: Token['token']
  setToken: React.Dispatch<React.SetStateAction<string>>
  handleComplete: (v: string) => void
}

const ResetPasswordTokenForm = ({token, setToken, handleComplete} : ResetPasswordTokenFormProps) => {
  return (
    <>
      <p
        className='text-white font-thin text-xl'
      >Enter the conde we sent you to reset your password:</p>
      <div className='flex gap-2 justify-center'>
        <PinInput
          value={token}
          onChange={v => setToken(v)}
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

export default ResetPasswordTokenForm
