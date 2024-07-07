import React from 'react'
import Navbar from '@/components/Navbar'

const Layout = ( {children }) => {
  return (
    <div className='flex flex-col min-h-screen max-h-screen'>
        <Navbar />
        <div className=''>
            {children}
        </div>
        <div className='text-center font-semibold text-sm'>
            created by <a href="https://github.com/akuBetaa">Ciwi RB Gengs</a>
        </div>
    </div>
  )
}

export default Layout