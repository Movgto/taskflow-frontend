import { Outlet } from 'react-router-dom'
import Header from '@/views/Header'
import Footer from '@/views/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const AppLayout = () => {
  return (
    <>
      <Header />
      <section className='max-w-7xl mx-auto mt-4 gap-2 px-1'>
        <Outlet />
      </section>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default AppLayout
