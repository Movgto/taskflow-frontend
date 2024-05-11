import { getProjectById } from "@/api/projectAPI"
import Loading from "@/components/Loading"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal"
import TaskList from "@/components/tasks/TaskList"
import { isManager } from "@/helpers/auth"
import useAuth from "@/hooks/auth/useAuth"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ProjectDetailsView = () => {
  const params = useParams()

  const {data: user, isLoading: authLoading} = useAuth()

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['editProject', params.id],
    queryFn: () => getProjectById(params.id!)
  })

  const navigate = useNavigate()

  console.log(data, isError, isLoading)

  if (isError) {
    toast.error(error.message, {
      toastId: 'projectError' + params.id
    })
    return <Navigate to="/404" />
  }
  if (isLoading || authLoading) return <Loading message="Tasks" />
  if (data && user) return (
    <>
      <h2 className="text-4xl font-bold text-gray-800 my-2">{data.projectName}</h2>
      <p className="text-gray-600 text-lg my-2">{data.description}</p>
      {isManager(data.manager, user._id) && (
        <>
          <nav className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('?newTask=true')}
              className="bg-indigo-600 text-white font-bold p-3 text-xl
                          rounded-md hover:bg-indigo-400 transition-colors"
            >
              Add a new Task
            </button>
            <Link
              to='team'
              className="bg-indigo-600 text-white font-bold p-3 text-xl
                          rounded-md hover:bg-indigo-400 transition-colors"
            >Members</Link>
          </nav>
        </>
      )}
      
      <TaskList tasks={data.tasks} />
      <AddTaskModal />
      <EditTaskData />
      <TaskDetailsModal />
    </>
  )
}

export default ProjectDetailsView
