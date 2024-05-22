import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProject from '@/views/projects/CreateProject'
import EditProject from '@/views/projects/EditProject'
import NotFound from '@/views/NotFound'
import ProjectDetailsView from '@/views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import SignUp from './views/auth/SignUp'
import AccountConfirmation from './views/auth/AccountConfirmation'
import ForgotPassword from './views/auth/ForgotPassword'
import ResetPassword from './views/auth/ResetPassword'
import TeamMembers from './views/projects/TeamMembers'
import ProfileLayout from './layouts/ProfileLayout'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path='/'>
          <Route index element={<DashboardView />} />
          <Route path='projects/create' element={<CreateProject />} />
          <Route path='projects/:id/edit' element={<EditProject />} />
          <Route path='projects/:id' element={<ProjectDetailsView />} />
          <Route path='projects/:id/team' element={<TeamMembers />} />
          <Route path='404' element={<NotFound />} />
          <Route element={<ProfileLayout/>}>
            <Route path='profile' element={<ProfileView />} />
            <Route path='profile/password' element={<ChangePasswordView />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />} path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='account-confirmation' element={<AccountConfirmation />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router