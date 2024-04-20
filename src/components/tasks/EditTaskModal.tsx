import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { Project, Task, TaskFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editTask } from "@/api/taskAPI"
import { toast } from "react-toastify"
import TaskForm from "./TaskForm"

type EditTaskModalProps = {
  show: boolean
  taskData: TaskFormData
  taskId: Task['_id'],
  projectId: Project['_id']
}

const EditTaskModal = ({show, taskData, taskId, projectId} : EditTaskModalProps) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: editTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      navigate(location.pathname, {replace: true})
      toast.success(data)
    }
  })

  console.log('Task data: ', taskData)

  const initialValues : TaskFormData = {
    name: taskData.name,
    description: taskData.description
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const handleEditTask = (taskData : TaskFormData) => {  
    mutate({projectId, taskId, taskData})
  }

  return (
    <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-50"
                    >
                        <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                            <Dialog.Title
                                as="h3"
                                className="font-black text-4xl  my-5"
                            >
                                Edit Task
                            </Dialog.Title>

                            <p className="text-xl font-bold">Fill this form to edit a {''}
                                <span className="text-indigo-600">Task</span>
                            </p>

                            <form                                    
                                noValidate
                                onSubmit={handleSubmit(handleEditTask)}
                                className="flex flex-col gap-4 py-4"
                            >
                                <TaskForm errors={errors} register={register} />
                                <input
                                    type="submit"
                                    value="Save Task"
                                    className="w-full bg-purple-700 hover:bg-purple-500
                                                transition-colors cursor-pointer text-white
                                                uppercase font-bold p-2 rounded-md"
                                />
                            </form>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}

export default EditTaskModal
