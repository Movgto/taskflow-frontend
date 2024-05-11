import { deleteTask } from "@/api/taskAPI"
import { Task } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type TaskCardProps = {
  task: Task
  canEdit: boolean
}

const TaskCard = ({ task, canEdit } : TaskCardProps) => {

  const navigate = useNavigate()

  const params = useParams()

  const projectId = params.id!

  const queryClient = useQueryClient()

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      toast.success(data)
    }
  })

  return (
    <li
      className="bg-white border border-slate-300 flex justify-between p-2"
    >
      <div className="flex flex-col gap-2 text-pretty break-words w-[70%]">
        <button
          className="font-bold text-slate-600 text-left"
        >
          {task.name}
        </button>
        <p
          className="text-left text-sm text-slate-500"
        >{task.description}</p>
      </div>

      <div className="flex">
          <Menu as="div" className="relative flex-none">
              <Menu.Button className="text-gray-500 hover:text-gray-900">
                  <span className="sr-only">options</span>
                  <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                          <button 
                            type='button'
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                            onClick={() => navigate(location.pathname + `?seeTask=${task._id}`)}
                          >
                              See
                          </button>
                      </Menu.Item>
                      {canEdit && (
                        <>
                          <Menu.Item>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                onClick={() => navigate(location.pathname + `?editTask=true&taskId=${task._id}`)}
                              >
                                  Edit
                              </button>
                          </Menu.Item>

                          <Menu.Item>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => deleteTaskMutation({projectId, taskId: task._id})}
                              >
                                  Delete
                              </button>
                          </Menu.Item>
                        </>
                      )}
                      
                  </Menu.Items>
              </Transition>
          </Menu>
      </div>
    </li>
  )
}

export default TaskCard
