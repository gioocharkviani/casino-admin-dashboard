import { LuLayoutDashboard } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { SlGameController } from 'react-icons/sl';

export const data = [
  {
    text: 'dashboard',
    link: '/',
    icon: LuLayoutDashboard,
    dropdown: [],
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
      {
        text: 'deactivated users',
        link: '/user',
      },
    ],
  },
  {
    text: 'notification',
    link: '/notification',
    icon: IoNotificationsOutline,
    dropdown: [],
  },
  {
    text: 'games',
    link: '/games',
    icon: SlGameController,
    dropdown: [],
  },
];
