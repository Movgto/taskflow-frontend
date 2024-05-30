import ProfileForm from "@/components/profile/ProfileForm"
import useAuth from "@/hooks/auth/useAuth"
import { toast } from "react-toastify"

const ProfileView = () => {
  const {data, isError, error} = useAuth()

  if (isError && !!error) {
    toast.error(error.message)
  }

  if (data) return (
    <section className="max-w-4xl mx-auto mt-4 flex flex-col gap-2 items-center">
      <h2 className="text-4xl font-bold text-gray-800">My Profile</h2>
      <p className="text-gray-600">
        See and edit your profile information
      </p>

      <ProfileForm data={data} />
    </section>
  )
}

export default ProfileView
