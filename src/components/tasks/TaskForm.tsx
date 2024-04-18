import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Task Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Task name"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "The name of the task cannot be empty",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Task Description</label>
                <textarea
                    id="description"
                    placeholder="Task description"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "The description of the task cannot be empty"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}