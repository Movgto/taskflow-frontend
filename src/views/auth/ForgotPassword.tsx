import { forgotPassword } from "@/api/authAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { emailPattern } from "@/helpers/index"
import { ForgotPasswordForm } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const defaultValues = {
  email: ''
}

const ForgotPassword = () => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues})

  const {mutate} = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  }) 

  const handleForm = (data : ForgotPasswordForm) => {
    mutate(data)
    reset()
  }
  return (
    <>
      <form
        className="bg-white p-5 rounded-md shadow-2xl shadow-black flex flex-col gap-2"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <h2 className="text-center text-2xl font-bold text-slate-700">Forgot your password?</h2>
        <p
          className="text-slate-600 text-pretty text-center"
        >Please enter your email so we can send you the instructions for reseting your password</p>
        <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="email"        
              className="bg-slate-200 rounded-sm ring-1 ring-slate-500 p-1"
              placeholder="e.g example@youremailaddress.com"
              {...register('email', {
                required: 'We need your email to help you reset your password',
                pattern: {
                  value: emailPattern,
                  message: 'Please enter a valid email'
                },                      
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input 
            type="submit"
            value="Request password reset"
            className="bg-indigo-700 hover:bg-indigo-500 cursor-pointer rounded-md text-white font-bold py-2"
          />
      </form>
    </>
  )
}

export default ForgotPassword
