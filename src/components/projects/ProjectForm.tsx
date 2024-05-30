import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ProjectFormData } from "@/types/index"

type ProjectFormProps = {
  errors: FieldErrors<ProjectFormData>
  register: UseFormRegister<ProjectFormData>
}

const ProjectForm = ({errors, register} : ProjectFormProps) => {
  return (
    <>
      <div className="mb-5 space-y-3">
          <label htmlFor="projectName" className="text-sm uppercase font-bold">
              Project name
          </label>
          <input
              id="projectName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Project"
              {...register("projectName", {
                  required: "Name of the Project is required",
              })}
          />

          {errors.projectName && (
              <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="clientName" className="text-sm uppercase font-bold">
              Client name
          </label>
          <input
              id="clientName"
              className="w-full p-3  border border-gray-200"
              type="text"
              placeholder="Name of the Client"
              {...register("clientName", {
                  required: "Name of the Client is required",
              })}
          />

          {errors.clientName && (
              <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
      </div>

      <div className="mb-5 space-y-3">
          <label htmlFor="description" className="text-sm uppercase font-bold">
              Description
          </label>
          <textarea
              id="description"
              className="w-full p-3  border border-gray-200"
              placeholder="Description of the Project"
              {...register("description", {
                  required: "Description of the Project is required"
              })}
          />

          {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
      </div>
    </>
  )
}

export default ProjectForm