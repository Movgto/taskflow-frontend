import api from "@/lib/axios"
import { Project, TaskFormData } from "../types"
import { isAxiosError } from "axios"

type CreateTasksArgs = {
  projectId: Project['_id']
  taskData: TaskFormData
}

export const createTask = async ({projectId, taskData} : CreateTasksArgs) => {
  try {
    const url = `/projects/${projectId}/tasks`

    const { data } = await api.post(url, taskData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}