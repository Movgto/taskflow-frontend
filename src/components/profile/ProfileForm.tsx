import { ProfileFormData, User } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/api/authAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
  data: User
}

const ProfileForm = ({data} : ProfileFormProps) => {

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['user']})
      toast.success(data)
    }
  })

  const defaultValues : ProfileFormData = {
    email: data.email,
    name: data.name
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues})

  const handleForm = (formData: ProfileFormData) => {
    mutate(formData)
  }
 
  return (
    <form 
      className="mt-5 bg-white rounded-md p-5 shadow-md w-full max-w-xl"        
      noValidate
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="mb-5 space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Name
          </label>
          <input
              id="name"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Project"
              {...register('name', {
                  required: "Name cannot be blank",
              })}
          />

          {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="clientName" className="text-sm uppercase font-bold">
              Email
          </label>
          <input
              id="clientName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Client"
              {...register('email', {
                  required: "Email cannot be blank",
              })}
          />

          {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
      </div>

      <input
          type="submit"
          value="Save"
          className="w-full bg-purple-700 hover:bg-purple-500
                    transition-colors cursor-pointer text-white
                    uppercase font-bold p-2 rounded-md"
      />
    </form>
  )
}

export default ProfileForm
