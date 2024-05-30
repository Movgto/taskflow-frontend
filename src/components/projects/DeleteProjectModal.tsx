import { DeleteProjectFormData } from '@/types/index'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkPassword } from '@/api/authAPI'
import { toast } from 'react-toastify'
import { deleteProject } from '@/api/projectAPI'

const DeleteProjectModal = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const deleteProjectId = searchParams.get('deleteProjectId')

  console.log(deleteProjectId)

  const show = !!deleteProjectId

  const queryClient = useQueryClient()

  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast.error(error.message)
  })

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['projects']})
        toast.success(data)
        navigate('/')
    }
  })

  const defaultValues : DeleteProjectFormData = {
    password: ''
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues})

  const handleForm = async (formData: DeleteProjectFormData) => {
    await checkPasswordMutation.mutateAsync(formData)
    await deleteProjectMutation.mutateAsync(deleteProjectId!)
    console.log(formData)
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
                                Delete Project
                            </Dialog.Title>

                            <p className="text-xl font-bold">Please, enter your password to delete the {''}
                                <span className="text-indigo-600">Project</span>
                            </p>

                            <form                                    
                                noValidate
                                onSubmit={handleSubmit(handleForm)}
                                className="flex flex-col gap-4 py-4"
                            >
                                <div className="flex flex-col gap-5">
                                    <label
                                        className="font-normal text-2xl"
                                        htmlFor="password"
                                    >Password</label>
                                    <input
                                        id="password"
                                        type="text"
                                        placeholder="********"
                                        className="w-full p-3  border-gray-300 border"
                                        {...register('password',{
                                          required: 'This field cannot be blank'
                                        })}                                       
                                    />
                                    {errors.password && (
                                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                                    )}                                 
                                </div>
                                <input
                                    type="submit"
                                    value="Delete Project"
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

export default DeleteProjectModal
