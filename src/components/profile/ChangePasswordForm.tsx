import { ChangePasswordFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/api/authAPI"
import { toast } from "react-toastify"

const ChangePasswordForm = () => {

  const defaultValues : ChangePasswordFormData = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const {register, handleSubmit, formState: {errors}, watch} = useForm({defaultValues})

  const password = watch('password')

  const {mutate} = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleForm = (formData: ChangePasswordFormData) => {
    mutate(formData)
  }

  return (
    <form 
      className="mt-5 bg-white rounded-md p-5 shadow-md w-full max-w-xl"        
      noValidate
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="mb-5 space-y-3">
          <label htmlFor="current_password" className="text-sm uppercase font-bold">
              Current password
          </label>
          <input
              id="current_password"
              className="w-full p-3  border border-gray-200"
              type="password"
              placeholder="••••••••"
              {...register('current_password', {
                  required: "This field cannot be empty",
              })}
          />

          {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="password" className="text-sm uppercase font-bold">
              New Password
          </label>
          <input
              id="password"
              className="w-full p-3  border border-gray-200"
              type="password"
              placeholder="••••••••"
              {...register('password', {
                  required: "This field cannot be empty",
                  validate: {
                    minLength : value => {
                      if (value.length < 8) return 'Password must be at least 8 characters long'
                    }
                  }
              })}
          />

          {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="password_confirmation" className="text-sm uppercase font-bold">
              Confirm your new password
          </label>
          <input
              id="password_confirmation"
              className="w-full p-3  border border-gray-200"
              type="password"
              placeholder="••••••••"
              {...register('password_confirmation', {
                  required: "This field cannot be empty",
                  validate: {
                    match: value => {
                      if (password !== value) return 'Passwords must match'
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
          value="Change Password"
          className="w-full bg-purple-700 hover:bg-purple-500
                    transition-colors cursor-pointer text-white
                    uppercase font-bold p-2 rounded-md"
      />
    </form>
  )
}

export default ChangePasswordForm
