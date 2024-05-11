import api from "@/lib/axios";
import { Project, TeamMemberFormData, User, teamSchema } from "../types";
import { isAxiosError } from "axios";

type TeamMemberArgs = {
  formData: TeamMemberFormData,
  projectId: Project['_id'],
  user: User
  memberId: User['_id']
}

export const findUserByEmail = async ({formData, projectId} : Pick<TeamMemberArgs, 'formData'|'projectId'>) => {
  try {
    const teamUrl = `/projects/${projectId}/team`
    const {data: user} = await api.post(teamUrl + '/find', formData)

    return user
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getMembers = async (projectId : Project['_id']) => {
  try {
    const url = `/projects/${projectId}/team`
    const {data} = await api(url)

    const result = teamSchema.safeParse(data)

    if (result.success) {
      return result.data
    }

    throw new Error('Invalid request, please try again later')
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const addMember = async ({user, projectId} : Pick<TeamMemberArgs, 'user'|'projectId'>) => {
  try {
    const url = `/projects/${projectId}/team`

    const {data} = await api.post(url, {id: user._id})

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const removeMember = async ({projectId, memberId} : Pick<TeamMemberArgs, 'projectId'|'memberId'>) => {
  try {
    const url = `/projects/${projectId}/team`

    const {data} = await api.delete(url, {data: {
      id: memberId
    }})

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}