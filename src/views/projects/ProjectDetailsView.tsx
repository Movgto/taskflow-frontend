import { getProjectById } from "@/api/projectAPI"
import Loading from "@/components/Loading"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"

const ProjectDetailsView = () => {
  const params = useParams()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['editProject', params.id],
    queryFn: () => getProjectById(params.id!)
  })

  const navigate = useNavigate()

  console.log(data, isError, isLoading)

  if (isError) return 'An error ocurred'
  if (isLoading) return <Loading message="Tasks" />
  if (data) return (
    <>
      <h2 className="text-4xl font-bold text-gray-800 my-2">{data.projectName}</h2>
      <p className="text-gray-600 my-2">{data.description}</p>

      <nav>
        <button
          type="button"
          onClick={() => navigate('?newTask=true')}
          className="bg-indigo-600 text-white font-bold p-3 text-xl
                      rounded-md hover:bg-indigo-400 transition-colors"
        >
          Add a new Task
        </button>
      </nav>
      <TaskList tasks={data.tasks} />
      <AddTaskModal />
    </>
  )
}

export default ProjectDetailsView
