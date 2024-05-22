import { useParams } from "react-router-dom"

const useProjectId = () => {
  const params = useParams()
  const projectId = params.id

  return projectId
}

export default useProjectId