import { emailPattern } from "@/helpers/index"
import { TeamMemberFormData } from "@/types/index"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

type AddMemberFormProps = {
  register: UseFormRegister<TeamMemberFormData>,
  errors: FieldErrors<TeamMemberFormData>
}

const AddMemberForm = ({register, errors} : AddMemberFormProps) => {
  return (
    <>
      <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >New Member email</label>
                <input
                    id="name"
                    type="email"
                    placeholder="e.g example@example.com"
                    className="w-full p-3  border-gray-300 border"
                    {...register('email', {
                        required: "We need an email to look for members to add",
                        pattern: {
                          value: emailPattern,
                          message: 'The email must be valid'
                        }
                    })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>            
    </>
  )
}

export default AddMemberForm
