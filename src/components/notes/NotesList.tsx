import { deleteNote, getNotes } from "@/api/noteAPI"
import useProjectId from "@/hooks/notes/useProjectId"
import useTaskId from "@/hooks/notes/useTaskId"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Fragment } from "react"
import useAuth from "@/hooks/auth/useAuth"

const NotesList = () => {

  const {data: user} = useAuth()

  const projectId = useProjectId()!

  const taskId = useTaskId()!

  const queryClient = useQueryClient()

  const {data, isError, error} = useQuery({
    queryKey: ['notes', taskId],
    queryFn: () => getNotes({
      projectId,
      taskId
    })
  })

  const {mutate} = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['notes', taskId]})
      toast.success(data)
    }
  })

  if (isError) {
    toast.error(error.message)
  }

  if (data && user) return (
    <div
      className="flex flex-col gap-2"
    >
      <h3
        className="text-2xl font-bold text-slate-700 mb-2 text-center"
      >Notes</h3>
      <ul className="flex flex-col gap-2">
        {data.map(note => (
          <li
            className="flex ring-1 ring-slate-500 rounded-sm p-2 justify-between"
            key={note._id}
          >
            <div className="flex flex-col gap-2">
              <p
                className="text-lg"
              >{note.content}</p>
              <p
                className="text-sm uppercase text-slate-600"
              >by {note.createdBy.name}</p>
            </div>   
            {user._id === note.createdBy._id && (
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="text-gray-500 hover:text-gray-900">
                        <span className="sr-only">options</span>
                        <EllipsisVerticalIcon className="h-9 w-9 translate-x-3" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          className="absolute right-0 -translate-x-3 z-30 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >                                                                                                       
                          <Menu.Item>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => mutate({
                                  projectId,
                                  taskId,
                                  noteId: note._id
                                })}
                              >
                                  Delete
                              </button>
                          </Menu.Item>          
                        </Menu.Items>
                    </Transition>
                </Menu>
              )
            }          
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesList
