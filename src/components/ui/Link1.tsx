import Link from 'next/link'
import React from 'react'

interface Link1Props {
    title: string,
    link: string,
    style?: keyof typeof styles, 
    icon?:any
}

const styles = {
  green: 'bg-bs-success hover:bg-hover-success',
  indigo: 'hover:bg-indigo-600 bg-indigo-500'
}

const Link1 = ({ title, link, style ,icon }: Link1Props) => {
  const Icon = icon;
  return (
    <Link href={link} className={`${style ? styles[style] : styles.indigo} py-2 bg-[#6fb80f] px-3 transition-all text-white rounded-sm text-sm font-medium flex items-center gap-2 justify-center`}>
      <div className=''>
      {icon &&
      <Icon />
    } 
    </div>
    <span className='sm:block hidden'>
      {title}
    </span>
    </Link>
  )
}

export default Link1
