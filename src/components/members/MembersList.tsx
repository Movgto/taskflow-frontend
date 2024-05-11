import { Team, TeamMember } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { useParams } from "react-router-dom"
import { Fragment } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeMember } from "@/api/memberAPI"
import { toast } from "react-toastify"

type MembersListProps = {
  data: Team
}

const MembersList = ({ data } : MembersListProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const projectId = params.id!

  const {mutate} = useMutation({
    mutationFn: removeMember,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['team', projectId]})
    }
  })

  const handleDelete = (memberId: TeamMember['_id']) => {
    mutate({
      projectId,
      memberId
    })
  }

  return (
    <>
      <h3
        className="text-2xl font-semibold mt-4"
      >Members list</h3>
      <ul
        className="flex flex-col gap-[0.07rem] mt-4"
      >
        {data.length ? data.map(member => (
          <li
            className="flex justify-between bg-white shadow-lg py-4 px-6 items-center"
            key={member._id}
          >
            <div className="flex flex-col gap-2">
              <p
                className="text-bold"
              >
                {member.name}
              </p>
              <p
                className="font-light"
              >
                {member.email}
              </p>
            </div>            
              <Menu
                as='div'
                className='relative'       
              >
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-50"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-50"
                >
                  <Menu.Items
                    className='absolute origin-top-right right-0 -translate-x-4 py-2 pr-8 pl-2 rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none'
                  >
                    <Menu.Item>
                      <button
                        type="button"
                        className="text-center text-red-500 text-sm block leading-5 text-nowrap"
                        onClick={() => handleDelete(member._id)}
                      >
                        Delete Member
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
                
                <Menu.Button
                  className="flex items-center"
                >
                  <span className="sr-only">options</span>
                  <EllipsisVerticalIcon
                    className="h-8 w-8 text-slate-600 hover:text-black"
                  />
                </Menu.Button>
              </Menu>
            
          </li>
        )) : (
          <li
            className="text-center py-6"
          >This Project does not have any members yet.</li>
        )}
      </ul>
    </>
  )
}

export default MembersList
