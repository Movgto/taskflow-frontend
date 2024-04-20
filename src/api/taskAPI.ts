import api from "@/lib/axios"
import { Project, Task, TaskFormData, taskSchema } from "../types"
import { isAxiosError } from "axios"

type StatusData = {
  status: Task['status']
}

type TaskAPIArgs = {
  projectId: Project['_id']
  taskId: Task['_id']
  taskData: TaskFormData
  statusData: StatusData
}

export const createTask = async ({projectId, taskData} : Pick<TaskAPIArgs, 'projectId'|'taskData'>) => {
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

export const getTaskById = async ({projectId, taskId} : Pick<TaskAPIArgs, 'projectId'|'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`

    const { data } = await api(url)

    console.log(data.task)

    const result = taskSchema.safeParse(data.task)

    console.log(result)

    if (result.success) return result.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const editTask = async ({projectId, taskId, taskData} : Pick<TaskAPIArgs, 'projectId'|'taskId'|'taskData'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`

    const { data } = await api.put(url, taskData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const deleteTask = async ({projectId, taskId} : Pick<TaskAPIArgs, 'projectId'|'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`

    const {data} = await api.delete(url)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const updateTaskStatus = async ({projectId, taskId, statusData} : Pick<TaskAPIArgs, 'projectId'|'taskId'|'statusData'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`

    const { data } = await api.patch(url, statusData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}