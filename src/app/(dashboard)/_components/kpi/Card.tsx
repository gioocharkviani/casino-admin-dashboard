import React from 'react'

interface Card {
    style?:keyof typeof styles,
    icon?: any,
    data?:any,
}

const styles = {
    indigo: 'hover:bg-indigo-600 bg-indigo-500',
    indigoGr: 'bg-gradient-to-r from-indigo-500 to-indigo-700',
  }
  

const Card = ({style ,icon ,data}:Card) => {
    const Icon = icon;
  return (
    <div className="w-full h-24 flex justify-between items-center dark:bg-darkBlue dark:border-darkBg bg-white p-2 rounded-md shadow-md border">
    <div className='flex flex-col gap-1 justify-center'>
        <span className='font-medium capitalize text-[14px] dark:text-[#9ea3ae] text-[#67748e]'>{data?.title}:</span>
        <div className='flex gap-2 font-bold text-[20px] dark:text-[#6580ad] text-bs-dark items-center'>
            <h5>{data?.value}</h5>
            <span className='text-bs-success text-[16px]'>+5</span>
        </div>
    </div>
    <div className={`md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all w-12 h-12 p-2 flex justify-center items-center rounded-lg ${style ? styles[style] : styles.indigo}`} >
    {icon &&
      <Icon className="md:w-8 md:h-8 h-6 w-6 text-white transition-all" />
    } 
    </div>
  </div>
  )
}

export default Card