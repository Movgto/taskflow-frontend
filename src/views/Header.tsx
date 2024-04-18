import NavMenu from "@/components/NavMenu"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className='bg-slate-900 py-4'>
      <div className='flex flex-col lg:flex-row items-center max-w-7xl mx-auto text-white font-black text-2xl lg:justify-between'>
        <Link to='/'>
          <h1 className="font-thin font-mono">Taskflow</h1>
        </Link>
        <NavMenu />
      </div>
    </header>
  )
}

export default Header
