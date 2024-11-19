import CreateNotifi from '@/app/(dashboard)/notification/_components/CreateNorifi'
import React from 'react'

const page =async () => {
  return (
    <div className='w-full bg-white p-2 relative rounded-md dark:bg-darkBlue'>
      <CreateNotifi />
    </div>
  )
}

export default page