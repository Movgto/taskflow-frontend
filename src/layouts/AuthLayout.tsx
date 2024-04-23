import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='bg-slate-800 min-h-screen flex flex-col justify-center px-1'>
      <div className='mx-auto flex flex-col justify-center gap-10'>
        <h1 className='font-mono font-thin text-6xl text-zinc-50 text-center'>Taskflow</h1>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
