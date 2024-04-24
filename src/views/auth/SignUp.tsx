import { signUp } from "@/api/authAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { SignUpFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const initialValues : SignUpFormData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const SignUp = () => {
  const {handleSubmit, register, formState: {errors}, watch} = useForm({defaultValues: initialValues})

  const { mutate, isError, error } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleForm = (data : SignUpFormData) => {
    mutate(data)
  }

  const password = watch('password')

  return (
    <>    
      <form
        className="bg-white p-5 rounded-md shadow-2xl shadow-black flex flex-col gap-2 w-full lg:w-[70vw] max-w-lg"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        {isError && <ErrorMessage>{error.message}</ErrorMessage>}
        <h2 className="text-center text-2xl font-bold text-slate-700">Sign Up</h2>
        <p
          className="text-slate-600 text-pretty text-center"
        >Please fill the next form to create an account.</p>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="font-bold"
          >
            Name
          </label>
          <input
            id="name"
            type="name"
            placeholder="e.g example@example.com"
            className="bg-slate-200 rounded-sm ring-1 ring-slate-500 p-1"
            {...register('name', {
              required: 'Name cannot be empty'                       
            })}
          />

          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>
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
                value: /^[a-z0-9._-]+@[a-z0-9._-]+\.\w+$/i,
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
            {...register('password', {
              required: 'Password cannot be empty',
              validate: {
                minLength: value => {
                  if (value.length < 8) {
                    return 'Password must be at least 8 characters long'
                  }
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
            {...register('password_confirmation', {
              required: 'Password confirmation cannot be empty',            
              validate: {
                passwordsMatch: value => {
                  if (value !== password) {
                    return 'Passwords should match'
                  }                                
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
          value="Create Account"
          className="bg-indigo-700 hover:bg-indigo-500 cursor-pointer rounded-md text-white font-bold py-2"
        />
      </form>

      <Link
        to='/login'
        className="text-white text-center w-full underline"
      >You already have an account? Login here</Link>
    </>
  )
}

export default SignUp
