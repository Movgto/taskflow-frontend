import { isAxiosError } from "axios";
import { LoginFormData } from "../types";
import api from "@/lib/axios";


export const loginAccount = async (formData : LoginFormData) => {
  try {
    const {data} = await api.post('/auth/login', formData)

    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}