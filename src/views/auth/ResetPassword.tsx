import { validateToken } from "@/api/authAPI"
import ResetPasswordForm from "@/components/auth/ResetPasswordForm"
import ResetPasswordTokenForm from "@/components/auth/ResetPasswordTokenForm"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const [isTokenValid, setTokenValid] = useState(false)
  const [token, setToken] = useState('')

  const {mutate} = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setTokenValid(true)
    }
  })

  const handleComplete = (v: string) => {
    mutate({
      token: v
    })
  }

  return (
    <>
      {!isTokenValid ? <ResetPasswordTokenForm token={token} setToken={setToken} handleComplete={handleComplete} /> :
        <ResetPasswordForm token={token} />
      }
    </>
  )
}

export default ResetPassword
