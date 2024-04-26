import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ResetPasswordFormData, Token } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "@/api/authAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const defaultValues : ResetPasswordFormData = {
  password: '',
  password_confirmation: ''
}

type ResetPasswordFormProps = {
  token: Token['token']
}

const ResetPasswordForm = ({token} : ResetPasswordFormProps) => {
  const {register, handleSubmit, formState: {errors}, watch} = useForm({defaultValues})

  const navigate = useNavigate()

  const {mutate: passwordReset} = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(error.message)
      navigate('/auth/login')
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/auth/login')
    }
  })

  const handleForm = (formData: ResetPasswordFormData) => {
    passwordReset({
      formData,
      token
    })
  }

  const password = watch('password')

  return (
    <>
      <form
        className="bg-white p-5 rounded-md shadow-2xl shadow-black flex flex-col gap-2 max-w-lg"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >        
        <h2 className="text-center text-2xl font-bold text-slate-700">Reset your password</h2>
        <p
          className="text-slate-600 text-pretty text-center"
        >Please set your new password</p>
        
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"        
            className="bg-slate-200 rounded-sm ring-1 ring-slate-500 p-1"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password cannot be empty',
              validate: {
                minLength: value => {
                  if (+value < 8) return 'Password must be at least 8 characters long'
                }
              }                       
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password_confirmation"
            className="font-bold"
          >
            Password
          </label>
          <input
            id="password_confirmation"
            type="password"        
            className="bg-slate-200 rounded-sm ring-1 ring-slate-500 p-1"
            placeholder="••••••••"
            {...register('password_confirmation', {
              required: 'Password confirmation cannot be empty',
              validate: {
                passwordMatch: value => {
                  if (value !== password) return 'Passwords must match'
                }
              }                      
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
        <input 
          type="submit"
          value="Reset password"
          className="bg-indigo-700 hover:bg-indigo-500 cursor-pointer rounded-md text-white font-bold py-2"
        />
      </form>
    </>
  )
}

export default ResetPasswordForm
