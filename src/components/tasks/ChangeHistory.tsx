import { Task } from "@/types/index"
import { taskGroupDict } from "./TaskList"


type ChangeHistoryProps = {
  changeHistory: Task['changeHistory']
}

const ChangeHistory = ({changeHistory} : ChangeHistoryProps) => {
  return (
    <>
      <h3
        className="text-2xl font-bold text-slate-700 mb-2 text-center"
      >History Change</h3>

      <ul>
        {changeHistory.map(ch => (
          <li key={ch._id} className="flex gap-2 items-center justify-between">
            <p
              className="text-xl text-slate-600"
            >{ch.user.name}</p>
            <p
              className={`font-bold ${taskGroupDict[ch.status].color}`}
            >{taskGroupDict[ch.status].title}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChangeHistory
