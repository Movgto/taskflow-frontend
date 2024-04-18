import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ProjectFormData } from '../../types'
import ProjectForm from "@/components/projects/ProjectForm"
import { createProject } from "@/api/projectAPI"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

const CreateProject = () => {

  const navigate = useNavigate()

  const initialState : ProjectFormData = {
    projectName: '',
    clientName: '',
    description: '',
  }

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => mutation.mutate(formData)

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialState})

  return (
    <section className="max-w-4xl mx-auto mt-4 flex flex-col gap-2 items-center">
      <h2 className="text-4xl font-bold text-gray-800">Create a Project</h2>
      <p className="text-gray-600">
        Fill the following form to create a new Project
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-400 p-3 text-white font-bold text-xl rounded-md"
      >
        Return to My Projects
      </Link>

      <form
        className="mt-5 bg-white rounded-md p-5 shadow-md w-full max-w-xl"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm
          errors={errors}
          register={register}
        />
        <input
          type="submit"
          value="Create Project"
          className="w-full bg-purple-700 hover:bg-purple-500
                    transition-colors cursor-pointer text-white
                    uppercase font-bold p-2 rounded-md"
        />
      </form>
    </section>
  )
}

export default CreateProject
