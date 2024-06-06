import { Task } from "@/types/index"
import { useDroppable } from "@dnd-kit/core"
import { useMemo } from "react"

type TaskDroppableProps = {
  id: Task['status']
}

const TaskDroppable = ({id} : TaskDroppableProps) => {
  const {isOver, setNodeRef} = useDroppable({id})

  const style = useMemo(() => `border-2 rounded-md border-dashed text-center font-semibold ${isOver ? 'border-slate-900 text-slate-900' : 'border-slate-400 text-slate-400'}`, [isOver])

  return (
    <div
      className={style}
      ref={setNodeRef}
    >
      <p>Drop a task here</p>
    </div>
  )
}

export default TaskDroppable
