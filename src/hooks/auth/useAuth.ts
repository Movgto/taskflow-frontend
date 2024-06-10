import { getUser } from "@/api/authAPI"
import { useQuery } from "@tanstack/react-query"


const useAuth = () => {
  const {data, isError, isLoading, error} = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 3,
    refetchOnWindowFocus: false
  })

  return {data, isError, isLoading, error}
}

export default useAuth