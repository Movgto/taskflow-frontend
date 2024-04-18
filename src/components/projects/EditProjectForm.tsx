import { Project, ProjectFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/api/projectAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type EditProjectFormProps = {
  data: ProjectFormData
  id: Project['_id']
}

const EditProjectForm = ({data, id} : EditProjectFormProps) => {

  const initialState : ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  }

  const {handleSubmit, register, formState: {errors} } = useForm({
    defaultValues: initialState
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey:['projects']})
        queryClient.invalidateQueries({queryKey:['editProject', id]})
        
        toast.success(data)
        navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    mutation.mutate({
        id,
        formData
    })
  }

  return (
    <form 
      className="mt-5 bg-white rounded-md p-5 shadow-md w-full max-w-xl"        
      noValidate
      onSubmit={handleSubmit(handleForm)}
    >
      <div className="mb-5 space-y-3">
          <label htmlFor="projectName" className="text-sm uppercase font-bold">
              Name of the Project
          </label>
          <input
              id="projectName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Project"
              {...register("projectName", {
                  required: "Name of the Project is required",
              })}
          />

          {errors.projectName && (
              <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="clientName" className="text-sm uppercase font-bold">
              Name of the Client
          </label>
          <input
              id="clientName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Client"
              {...register("clientName", {
                  required: "Name of the Client is required",
              })}
          />

          {errors.clientName && (
              <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="description" className="text-sm uppercase font-bold">
              Description
          </label>
          <textarea
              id="description"
              className="w-full p-3  border border-gray-200"
              placeholder="Description of the Project"
              {...register("description", {
                  required: "Description of the Project is required"
              })}
          />

          {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
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

export default EditProjectForm
