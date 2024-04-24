import { isAxiosError } from "axios";
import { LoginFormData, SignUpFormData } from "../types";
import api from "@/lib/axios";


export const loginAccount = async (formData : LoginFormData) => {
  try {
    const url = '/auth/login'
    const {data} = await api.post(url, formData)

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