import { loginAccount } from "@/api/authAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { emailPattern } from "@/helpers/index"
import { LoginFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const initialValues : LoginFormData = {
  email: '',
  password: ''
}

const Login = () => {

  const navigate = useNavigate()

  const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: initialValues})

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: loginAccount,
    onSuccess: () => {
      console.log('Logging successfully')
      toast.success('Logging in...')      
    }
  })

  const handleForm = async (data : LoginFormData) => {
    await mutateAsync(data)
    navigate('/')
  }

  return (
    <>    
      <form
        className="bg-white p-5 rounded-md shadow-2xl shadow-black flex flex-col gap-2 max-w-lg"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        {isError && <ErrorMessage>{error.message}</ErrorMessage>}
        <h2 className="text-center text-2xl font-bold text-slate-700">Login</h2>
        <p
          className="text-slate-600 text-pretty text-center"
        >Please enter your email and password to log into your account.</p>
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
            placeholder="e.g example@example.com"
            className="bg-slate-200 rounded-sm ring-1 ring-slate-500 p-1"
            {...register('email', {
              required: 'Email cannot be empty',
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
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <input 
          type="submit"
          value="Sign In"
          className="bg-indigo-700 hover:bg-indigo-500 cursor-pointer rounded-md text-white font-bold py-2"
        />
      </form>

      <nav className="flex flex-col gap-1 text-white text-center w-full underline">
        <Link to='/auth/signup'>You don't have an account yet?</Link>
        <Link to='/auth/forgot-password'>I can't remember my password</Link>
      </nav>
    </>
  )
}

export default Login
