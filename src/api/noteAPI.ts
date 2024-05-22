import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task, noteListSchema } from "../types"
import { isAxiosError } from "axios"

type NoteParams = {
  projectId: Project['_id']
  taskId: Task['_id']
  noteId: Note['_id']
  noteFormData: NoteFormData
}

export const createNote = async ({projectId, taskId, noteFormData} : Pick<NoteParams, 'projectId'|'taskId'|'noteFormData'>) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`

  try {
    const {data} = await api.post(url, noteFormData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getNotes = async ({projectId, taskId} : Pick<NoteParams, 'projectId'|'taskId'>) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes`

  try {
    const {data} = await api(url)
    console.log('---- Notes api retrieved data ----')
    console.log(data)
    const result = noteListSchema.safeParse(data)

    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const deleteNote = async ({projectId, taskId, noteId} : Pick<NoteParams, 'projectId'|'taskId'|'noteId'>) => {
  const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`

  try {
    const {data} = await api.delete(url)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}