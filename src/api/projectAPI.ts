import { isAxiosError } from "axios";
import { Project, ProjectFormData, dashboardProjectsSchema, projectSchema } from "../types";
import api from "@/lib/axios";

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getProjects = async () => {
  try {
    const { data } = await api('/projects')

    const result = dashboardProjectsSchema.safeParse(data.data)
    console.log(data)
    console.log('---- Dashboard data validation ----')
    console.log(result)
    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getProjectById = async (id : Project['_id']) => {
  try {
    const { data } = await api(`/projects/${id}`)
    console.log(data)
    const result = projectSchema.safeParse(data)
    console.log(result)

    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

type UpdateProjectProps = {
  id: Project['_id']
  formData: ProjectFormData
}

export const updateProject = async ({ id, formData } : UpdateProjectProps) => {
  try {
    const { data } = await api.put(`/projects/${id}`, formData)

    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const deleteProject = async (id: Project['_id']) => {
  try {
    console.log("Project Id to delete", id)
    const { data } = await api.delete(`/projects/${id}`)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getProjectTasks = async (id: Project['_id']) => {
  try {
    const { data } = await api(`/projects/${id}/tasks`)

    return data
  } catch (error) {
    
  }
}