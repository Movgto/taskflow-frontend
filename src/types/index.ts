import {z} from 'zod'

const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
export const taskStatus = ['pending', 'onHold', 'inProgress', 'underReview', 'completed']


// Tasks schemas and types
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

// Projects schemas and types
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema)
})

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    tasks: true,
  })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

export const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  confirmed: z.boolean()
})

export type Auth = z.infer<typeof authSchema>
export type SignUpFormData = Pick<Auth, 'name'|'email'|'password'|'password_confirmation'>
export type LoginFormData = Pick<Auth, 'email'|'password'>

export const userSchema = authSchema.pick({
  _id: true,
  name: true,
  email: true
})

export type User = z.infer<typeof userSchema>

export type Token = {
  token: string,
  user: string
}

// Reset password types

export type ForgotPasswordForm = Pick<Auth, 'email'>
export type ValidateToken = Pick<Token, 'token'>
export type ResetPasswordFormData = Pick<Auth, 'password'|'password_confirmation'>
export type ResetPasswordRequest = {
  formData: ResetPasswordFormData
  token: Token['token']
}