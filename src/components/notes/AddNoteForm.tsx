import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/noteAPI"
import { toast } from "react-toastify"
import useProjectId from "@/hooks/notes/useProjectId"
import useTaskId from "@/hooks/notes/useTaskId"

const defaultValues : NoteFormData = {
  content: ''
}

const AddNoteForm = () => {
  const projectId = useProjectId()!

  const taskId = useTaskId()!

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues})

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['notes', taskId]})
      toast.success(data)
    }
  })

  const handleCreateNote = (formData: NoteFormData) => {
    mutate({
      projectId,
      taskId,
      noteFormData: formData
    })
  }
  return (
    <form
      noValidate
      className="flex flex-col gap-2 mt-2"
      onSubmit={handleSubmit(handleCreateNote)}
    >
      <div
        className="flex flex-col gap-2"
      >
        <label 
          htmlFor="content"
          className="font-bold uppercase text-sm"
        >Write a Note</label>
        <input
          type="text"
          id="content"
          className="border-gray-300 border p-2"
          {...register('content',
            {
              required: 'Content must not be empty',
            }
          )}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Add Note"
        className="bg-purple-700 hover:bg-purple-500
        transition-colors cursor-pointer text-white
        uppercase font-bold p-2 rounded-md" 
      />
    </form>
  )
}

export default AddNoteForm
