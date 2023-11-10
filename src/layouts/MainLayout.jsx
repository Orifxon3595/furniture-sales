import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div>
        <Navbar />
        <main className='max-w-6xl mx-auto py-20'>
            <Outlet />
        </main>
    </div>
  )
}

export default MainLayout