import { getMembers } from "@/api/memberAPI"
import AddMemberModal from "@/components/members/AddMemberModal"
import MembersList from "@/components/members/MembersList"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"

const TeamMembers = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {data, isLoading} = useQuery({
    queryKey: ['team', id],
    queryFn: () => getMembers(id!)
  })

  return (
    <>
      <h2 className="text-4xl font-bold text-gray-800 my-2">Project Members</h2>
      <p className="text-gray-600 text-lg my-2 font-normal">Add or remove members of your project</p>

      <nav className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate('?addMember=true')}
          className="bg-indigo-600 text-white font-bold p-3 text-xl
                      rounded-md hover:bg-indigo-400 transition-colors"
        >
          Add a member
        </button>
        <Link
          to={`/projects/${id}`}
          className="bg-indigo-600 text-white font-bold p-3 text-xl
                      rounded-md hover:bg-indigo-400 transition-colors"
        >Return to Project</Link>
      </nav>

      {isLoading && <p>Loading members...</p>}
      {data && <MembersList data={data} />}

      <AddMemberModal />
    </>
  )
}

export default TeamMembers
