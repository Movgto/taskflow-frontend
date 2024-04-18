import { Transition, Dialog } from "@headlessui/react"
import { Fragment } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import TaskForm from "./TaskForm"
import { useForm } from "react-hook-form"
import { TaskFormData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "@/api/taskAPI"
import { toast } from "react-toastify"

const AddTaskModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const show = searchParams.get('newTask')

  const initialValues : TaskFormData = {
    name: '',
    description: '',
  }

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: initialValues
  })

  const queryClient = useQueryClient()
  
  const { id } = useParams()

  const mutation = useMutation({
    mutationFn: createTask,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['editProject', id]})
        toast.success(data)
        navigate(location.pathname, {
            replace: true
        })
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    if (id) {        
        mutation.mutate({
            projectId: id,
            taskData: formData
        })
    } else {
        toast.error('Invalid Project ID')
    }
  }

  return (
    <>
        <Transition appear show={show ? true : false} as={Fragment}>
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
                                    New Task
                                </Dialog.Title>

                                <p className="text-xl font-bold">Fill the form to create a new {''}
                                    <span className="text-indigo-600">Task</span>
                                </p>

                                <form                                    
                                    noValidate
                                    onSubmit={handleSubmit(handleCreateTask)}
                                    className="flex flex-col gap-4 py-4"
                                >
                                    <TaskForm errors={errors} register={register} />
                                    <input
                                        type="submit"
                                        value="Create Project"
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
    </>
)
}

export default AddTaskModal
