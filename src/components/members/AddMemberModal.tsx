import { TeamMemberFormData } from "@/types/index"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import AddMemberForm from "@/components/members/AddMemberForm"
import { useMutation } from "@tanstack/react-query"
import { findUserByEmail } from "@/api/memberAPI"
import AddMemberCard from "./AddMemberCard"

const AddMemberModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const addMember = searchParams.get('addMember')

  const show = !!addMember

  const params = useParams()

  const projectId = params.id!

  const mutation = useMutation({
    mutationFn: findUserByEmail
  })

  const defaultValues : TeamMemberFormData = {
    email: ''
  }
  const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues})

  const handleForm = (formData: TeamMemberFormData) => {
    mutation.mutate({
      formData,
      projectId
    })

    reset()
  }

  return (
    <>
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
                                    Add a new member to the Project
                                </Dialog.Title>

                                <p className="text-xl font-bold">Search for a new member by their {''}
                                    <span className="text-indigo-600">Email</span>
                                </p>

                                <form                                    
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                    className="flex flex-col gap-4 py-4"
                                >
                                    <AddMemberForm errors={errors} register={register} />
                                    <input
                                        type="submit"
                                        value="Search for a member"
                                        className="w-full bg-purple-700 hover:bg-purple-500
                                                    transition-colors cursor-pointer text-white
                                                    uppercase font-bold p-2 rounded-md"
                                    />
                                </form>

                                {mutation.isError && <p
                                  className="text-center"
                                >{mutation.error.message}</p>}
                                {mutation.isPending && <p
                                  className="text-center"
                                >Searching...</p>}
                                {mutation.data && <AddMemberCard data={mutation.data} />}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default AddMemberModal
