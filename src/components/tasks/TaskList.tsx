import { Task } from "@/types/index"
import useTasksGrouped from "@/hooks/tasks/useTasksGrouped"
import TaskCard from "./TaskCard"

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

  console.log(groupedTasks)
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-visible pb-32'>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
              <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                  <h2
                    className={`text-xl font-bold ${taskGroupDict[status].color} text-center`}
                  >{taskGroupDict[status].title}</h2>
                  <ul className='mt-5 flex flex-col gap-2'>
                      {tasks.length === 0 ? (
                          <li className="text-gray-500 text-center pt-3">No Tasks here</li>
                      ) : (
                          tasks.map(task => <TaskCard key={task._id} task={task} />)
                      )}
                  </ul>
              </div>
          ))}
      </div>
    </>
  )
}

export default TaskList
