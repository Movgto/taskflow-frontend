import { Task } from "@/types/index";

// 'pending', 'onHold', 'inProgress', 'underReview', 'completed'

type TaskGroups = {
  [key: string]: Task[]
}
const initialTaskGroups : TaskGroups = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}

const useTasksGrouped = (tasks: Task[]) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup }
  }, initialTaskGroups);

  return groupedTasks
}

export default useTasksGrouped