import { DashboardProject, User } from "@/types/index"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject } from "@/api/projectAPI"
import { toast } from "react-toastify"

type ProjectCardsProps = {
  project: DashboardProject
  user: User
}

const ProjectCard = ({project, user} : ProjectCardsProps) => {

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const mutation = useMutation({
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

    const handleDeleteProject = () => {
        mutation.mutate(project._id)
    }

    return (
        <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10 relative">
            <div className="flex flex-col gap-4">
                    <div
                        className="absolute origin-top-left left-0 top-0 p-2"
                    >
                        {project.manager === user._id ?
                            (<p
                                className="font-bold text-xs text-lime-600 uppercase
                                bg-lime-100 border-2 border-lime-600 py-1 px-4 rounded-md"
                            >
                                Manager
                            </p>) :
                            (<p
                                className="font-bold text-xs text-cyan-600 uppercase
                                bg-cyan-100 border-2 border-cyan-600 py-1 px-4 rounded-md"
                            >
                                Collaborator
                            </p>)
                        }
                    </div>
                    
                    <Link to={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >{project.projectName}</Link>
                    <p className="text-sm text-gray-400">
                        Client: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                        {project.description}
                    </p>
                
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">options</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                                <Menu.Item>
                                    <Link to={`/projects/${project._id}`}
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    See Project
                                    </Link>
                                </Menu.Item>
                                {project.manager === user._id && (
                                    <>
                                        <Menu.Item>
                                            <Link to={`/projects/${project._id}/edit`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                            Edit Project
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button 
                                                type='button' 
                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                onClick={() => handleDeleteProject() }
                                            >
                                                Delete Project
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

export default ProjectCard
