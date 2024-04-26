import { isAxiosError } from "axios";
import { ForgotPasswordForm, LoginFormData, ResetPasswordRequest, SignUpFormData, Token, ValidateToken } from "../types";
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