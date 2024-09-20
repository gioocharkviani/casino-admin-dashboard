"use client"
import { useState } from "react";
import SidebarItem from "./Sidebar-item";
import { data } from "./data";

import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDropleft } from "react-icons/io";
import Toggle from "../ui/Toggle";
import DarkModeSwich from "../darkmode/DarkModeSwich";




export default function Sidebar(){
    const [active, setactive] = useState(false)
  return (
    <aside className='h-screen fixed z-10 top-0 left-0'>
        <nav className='p-2 pb-2 flex flex-col justify-between items-center bg-white dark:bg-darkBlue dark:text-white transition-all shadow-md rounded-r-md border-r dark:border-black h-full'>

            <div className='flex p-2 w-full gap-4 justify-end items-center'>
                <button onClick={()=> setactive(!active)} className={`${active? 'text-[#2fe42f]' :''} border dark:border-darkBg shadow-md rounded-md p-1 transition-all ease-in-out`}>
                    <IoIosArrowDropleft  className={`w-6 h-6  transition-all ease-in-out ${active? 'rotate-0' : 'rotate-180'}`}/>
                </button>
            </div>

            <div className={`flex-1 sidebar-content overflow-y-auto overflow-x-hidden transition-all ${active? 'w-52' : 'w-12'}`}>
                <ul className="flex flex-col my-2 items-center jus w-full ">
                    {data.map((i: any, index: number) =>
                        <SidebarItem key={index} data={i} icon={<LuLayoutDashboard />} isOpen={active}/>
                    )}
                </ul>
            </div>

            <div className='w-full justify-center my-4 flex items-center'>
                <DarkModeSwich />
            </div>


        </nav>
    </aside>
  )
};
