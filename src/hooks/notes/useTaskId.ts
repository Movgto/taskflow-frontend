import { useLocation } from "react-router-dom"

const useTaskId = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const taskId = searchParams.get('seeTask')

  return taskId
}

export default useTaskId