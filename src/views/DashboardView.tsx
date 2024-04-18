import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getProjects } from "../api/projectAPI"
import ProjectCard from "@/components/projects/ProjectCard"
import Loading from "@/components/Loading"

const DashboardView = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  console.log(data, isError, isLoading)

  if (isLoading) return <Loading message="Projects" />

  if (data) return (
    <>
      <h2 className="text-4xl font-bold text-gray-800 my-2">My Projects</h2>
      <p className="text-gray-600 my-2">Manage your Projects</p>
      <Link
        to="/projects/create"
        className="bg-indigo-600 hover:bg-indigo-400 p-3
                text-white font-bold text-xl rounded-md block
                w-fit my-2"
      >
        Create a Project
      </Link>

      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {data.length ? data.map(project => (
          <ProjectCard project={project} />
        )) :
          (
            <li className="flex justify-center p-6">
              <p className="text-slate-600">
                There are no Projects yet.{' '}
                <Link
                  to='/projects/create'
                  className="text-indigo-600 font-bold"
                >
                  Create a new Project
                </Link>
              </p>
            </li>
          )
        }
      </ul>
    </>
  )
}

export default DashboardView
