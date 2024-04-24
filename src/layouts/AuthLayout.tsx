import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AuthLayout = () => {
  return (
    <>
      <div className='bg-slate-800 min-h-screen flex flex-col justify-center px-1'>
        <div className='mx-auto flex flex-col justify-center gap-10 max-w-4xl'>
          <h1 className='font-mono font-thin text-6xl text-zinc-50 text-center'>Taskflow</h1>          
          <Outlet />          
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AuthLayout
