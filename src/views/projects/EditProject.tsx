import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useParams } from "react-router-dom"
import { getProjectById } from "../../api/projectAPI"
import { ProjectFormData } from "../../types"
import EditProjectForm from "@/components/projects/EditProjectForm"
import Loading from "@/components/Loading"

const EditProject = () => {
  const params = useParams()

  const id = params.id!

  const {data, isError, isLoading} = useQuery({
    queryKey: ['editProject', id],
    queryFn: () => getProjectById(id)
  })

  console.log(data, isError, isLoading)

  if (isLoading) return <Loading message='Project' />
  if (isError) return <Navigate to='/404' />

  if (data) return (
    <section className="max-w-4xl mx-auto mt-4 flex flex-col gap-2 items-center">
      <h2 className="text-4xl font-bold text-gray-800">Edit Project</h2>
      <p className="text-gray-600">
        Fill the following form to fill an existing Project
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-400 p-3 text-white font-bold text-xl rounded-md"
      >
        Return to My Projects
      </Link>

      <EditProjectForm data={data as ProjectFormData} id={id}/>
    </section>
  )
}

export default EditProject
