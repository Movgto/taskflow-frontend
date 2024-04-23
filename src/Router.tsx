import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProject from '@/views/projects/CreateProject'
import EditProject from '@/views/projects/EditProject'
import NotFound from '@/views/NotFound'
import ProjectDetailsView from '@/views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'

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
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router