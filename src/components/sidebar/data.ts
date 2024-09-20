import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";



export const data = [
    {
        text: 'dashboard',
        link: '/',
        icon: LuLayoutDashboard,  
        dropdown: [] 
    },
    {
        text: 'users',
        link: '/users',
        icon: FiUsers, 
        dropdown: [
            {
                text: 'user list',
                link: '/user',
            },
        ] 
    },
    {
        text: 'notification',
        link: '/notification',
        icon: IoNotificationsOutline, 
        dropdown: [] 
    },



];
