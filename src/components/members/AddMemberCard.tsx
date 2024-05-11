import { addMember } from "@/api/memberAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type AddMemberProps = {
  data: TeamMember
}

const AddMemberCard = ({data} : AddMemberProps) => {
  const params = useParams()
  const navigate = useNavigate()

  const projectId = params.id!

  const queryClient = useQueryClient()

  const {mutate, reset} = useMutation({
    mutationFn: addMember,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['team', projectId]})
      reset()
      navigate(location.pathname, {replace: true})
    }
  })

  return (
    <div
      className="flex justify-between"
    >
      <p>{data.name}</p>
      <button
        type="button"
        className="text-indigo-700 font-bold p-2 rounded-md hover:text-white hover:bg-indigo-700"
        onClick={() => mutate({
          user: data,
          projectId
        })}
      >
        Add member
      </button>
    </div>
  )
}

export default AddMemberCard
