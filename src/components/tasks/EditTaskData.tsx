import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/taskAPI"

const EditTaskData = () => {
  const location = useLocation()

  const editTask = new URLSearchParams(location.search).get('editTask')

  const params = useParams()

  const projectId = params.id!

  const taskId = new URLSearchParams(location.search).get('taskId')!

  console.log(projectId, taskId)

  const {data, isError} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId && !!projectId
  })

  if (isError) return <Navigate to="/404" />

  if (data) return (
   <EditTaskModal show={!!editTask} taskData={data} taskId={taskId} projectId={projectId} />
  )
}

export default EditTaskData
