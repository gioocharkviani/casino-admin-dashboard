import React from 'react'
import User from './User'
import Navigate from './Navigate'

const Header = () => {
  return (
    <div className='w-full  rounded-lg relative px-2 py-1 gap-2 flex transition-all'>

        <div className='flex-1  min-h-full'>
          <div className='p-2 bg-white dark:bg-darkBlue border dark:border-darkBg shadow-md h-full rounded-md flex items-center'>
            <Navigate />
          </div>
        </div>

        <div className='p-2 bg-white dark:bg-darkBlue border dark:border-darkBg shadow-md h-full rounded-md flex items-center gap-5'>
            <User />
        </div>

    </div>
  )
}

export default Header