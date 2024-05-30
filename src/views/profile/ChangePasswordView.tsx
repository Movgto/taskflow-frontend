import ChangePasswordForm from "@/components/profile/ChangePasswordForm"

const ChangePasswordView = () => {
  return (
    <section className="max-w-4xl mx-auto mt-4 flex flex-col gap-2 items-center">
      <h2 className="text-4xl font-bold text-gray-800">Change your password</h2>
      <p className="text-gray-600">
        Please enter your current password and the new password below.
      </p>

      <ChangePasswordForm />
    </section>
  )
}

export default ChangePasswordView
