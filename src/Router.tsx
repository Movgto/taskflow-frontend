import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProject from '@/views/projects/CreateProject'
import EditProject from '@/views/projects/EditProject'
import NotFound from '@/views/NotFound'
import ProjectDetailsView from '@/views/projects/ProjectDetailsView'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path='/'>
          <Route index element={<DashboardView />} />
          <Route path='projects/create' element={<CreateProject />} />
          <Route path='projects/:id/edit' element={<EditProject />} />
          <Route path='projects/:id' element={<ProjectDetailsView />} />
          <Route path='404' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router