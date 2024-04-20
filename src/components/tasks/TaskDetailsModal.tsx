import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '@/api/taskAPI';
import { formatDateString } from '@/helpers/index';
import { Task, taskStatus as taskStatusArray } from '@/types/index';
import { taskGroupDict } from './TaskList';
import { toast } from 'react-toastify';


const TaskDetailsModal = () => {

  const [taskStatus, setTaskStatus] = useState<Task['status']>('pending')

  const navigate = useNavigate()
  
  const location = useLocation()
  
  const taskId = new URLSearchParams(location.search).get('seeTask')!
  
  const show = !!taskId
  
  const params = useParams()
  
  const projectId = params.id!
  
  const {data, isError, error} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
      toast.success(data, {
        toastId: 'taskSuccess' + taskId
      })
    }
  })

  const handleClose = () => {
    if (taskStatus !== data?.status) {
      mutate({projectId, taskId, statusData: {status: taskStatus}})
    }
    navigate(location.pathname)
  }

  useEffect(() => {    
    if (data) setTaskStatus(data.status)
  }, [data])

  if (isError) {
    toast.error(error.message, {
      toastId: 'taskError' + taskId
    })
    return <Navigate to={location.pathname} />
  }
  
  if (data) return (
      <>
          <Transition appear show={show} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                                  <p className='text-sm text-slate-400'>Created at: {formatDateString(data.createdAt)}</p>
                                  <p className='text-sm text-slate-400'>Updated at: {formatDateString(data.updatedAt)}</p>
                                  <Dialog.Title
                                      as="h3"
                                      className="font-black text-4xl text-slate-600 my-5"
                                  >{data.name}
                                  </Dialog.Title>
                                  <p className='text-lg text-slate-500 mb-2'>{data.description}</p>
                                  <div className='my-5 space-y-3'>
                                    <form
                                      noValidate                                    
                                    >
                                      <label className='font-bold'>Status: </label>
                                      <select
                                        id="status"                                        
                                        value={taskStatus}
                                        name="status"
                                        onChange={(e) => setTaskStatus(e.target.value as Task['status'])}
                                        title="status"
                                      >
                                        {taskStatusArray.map(status => (
                                          <option value={status}>{taskGroupDict[status].title}</option>
                                        ))}
                                      </select>
                                    </form>
                                  </div>
                              </Dialog.Panel>
                          </Transition.Child>
                      </div>
                  </div>
              </Dialog>
          </Transition>
      </>
  )
}

export default TaskDetailsModal