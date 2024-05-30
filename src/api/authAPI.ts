import { isAxiosError } from "axios";
import { ChangePasswordFormData, DeleteProjectFormData, ForgotPasswordForm, LoginFormData, ProfileFormData, ResetPasswordRequest, SignUpFormData, Token, ValidateToken, userSchema } from "../types";
import api from "@/lib/axios";


export const loginAccount = async (formData : LoginFormData) => {
  try {
    const url = '/auth/login'
    const {data} = await api.post(url, formData)

    localStorage.setItem('TASKFLOW_AUTH_TOKEN', data)

    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const signUp = async (formData: SignUpFormData) => {
  try {
    const url = '/auth/create-account'
    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const confirmAccount = async (token : Token['token']) => {
  try {
    const url = '/auth/confirm-account'

    const {data} = await api.post(url, {token})

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const forgotPassword = async (formData: ForgotPasswordForm) => {
  try {
    const url = '/auth/forgot-password'
    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const validateToken = async (formData: ValidateToken) => {
  try {
    const url = `/auth/validate-token/${formData.token}`
    const {data} = await api.post(url)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const resetPassword = async ({formData, token}: ResetPasswordRequest) => {
  try {
    const url = `/auth/reset-password/${token}`

    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const getUser = async () => {
  try {
    const {data} = await api('/auth/user')

    const result = userSchema.safeParse(data)

    console.log('Authenticating user')
    console.log(result)

    if (result.success) {
      console.log('Success!')
      return result.data
    }    
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const updateProfile = async (formData: ProfileFormData) => {
  try {
    const url = `/auth/user/profile`
    const {data} = await api.put(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const changePassword = async (formData: ChangePasswordFormData) => {
  try {
    const url = '/auth/user/change-password'
    const {data} = await api.put(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export const checkPassword = async (formData: DeleteProjectFormData) => {
  try {
    const url = '/auth/user/check-password'
    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}