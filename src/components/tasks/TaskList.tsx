import { Project, Task } from "@/types/index"
import useTasksGrouped from "@/hooks/tasks/useTasksGrouped"
import TaskCard from "./TaskCard"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getProjectById } from "@/api/projectAPI"
import useAuth from "@/hooks/auth/useAuth"
import Loading from "../Loading"
import { useMemo } from "react"
import TaskDroppable from "./TaskDroppable"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { updateTaskStatus } from "@/api/taskAPI"
import { toast } from "react-toastify"

type TaskListProps = {
  tasks: Task[]
}

type TaskGroupDict = {
  [key: string] : {
    title: string,
    color: string,
  }
}

export const taskGroupDict : TaskGroupDict = {
  pending: {
    title: 'Pending',
    color: 'text-slate-500'
  },
  onHold: {
    title: 'On Hold',
    color: 'text-red-500'
  },
  inProgress: {
    title: 'In Progress',
    color: 'text-blue-500'
  },
  underReview: {
    title: 'Under Review',
    color: 'text-amber-500'
  },
  completed: {
    title: 'Completed',
    color: 'text-emerald-600'
  },
}

const TaskList = ({tasks} : TaskListProps) => {
  const groupedTasks = useTasksGrouped(tasks)
  const params = useParams()
  const projectId = params.id!

  const {data, isLoading} = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId)
  })

  const {data: user, isLoading: authLoading} = useAuth()

  console.log(groupedTasks)

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      toast.success(data)
    }
  })

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over && e.over.id) {
      mutate({
        projectId,
        taskId: e.active.id.toString(),
        statusData: {
          status: e.over.id as Task['status']
        }
      })

      queryClient.setQueryData(['editProject', projectId], (projectData: Project) => {
        const updatedTasks = projectData!.tasks.map(task => {
          if (task._id === e.active.id.toString()) {
            return {
              ...task,
              status: e.over!.id as Task['status']
            }
          }

          return task
        })

        return {
          ...projectData,
          tasks: updatedTasks
        }
      })
    }
  }


  if (isLoading || authLoading) return <Loading message="Tasks" />

  if (data && user) return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
      <DndContext
        onDragEnd={handleDragEnd}
      >
        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-visible pb-32'>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
                <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    <h2
                      className={`text-xl font-bold ${taskGroupDict[status].color} text-center`}
                    >{taskGroupDict[status].title}</h2>
                    <ul className='mt-5 flex flex-col gap-2'>
                      <TaskDroppable id={status as Task['status']} />
                      {tasks.length === 0 ? (
                          <li className="text-gray-500 text-center pt-3">No Tasks here</li>
                      ) : (
                          tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                      )}
                    </ul>
                </div>
            ))}
        </div>
      </DndContext>
    </>
  )
}

export default TaskList
