import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";

export const data = [
  {
    text: "dashboard",
    link: "/",
    icon: LuLayoutDashboard,
    dropdown: [],
  },
  {
    text: "users",
    link: "/users",
    icon: FiUsers,
    dropdown: [
      {
        text: "user list",
        link: "/user",
      },
      {
        text: "deactivated users",
        link: "/user/deactivated",
      },
      {
        text: "blackList",
        link: "/user/blacklist",
      },
      {
        text: "user levels",
        link: "/user/levels",
      },
    ],
  },
  {
    text: "notification",
    link: "/notification",
    icon: IoNotificationsOutline,
    dropdown: [],
  },
  {
    text: "games",
    link: "/games",
    icon: SlGameController,
    dropdown: [
      {
        text: "game list",
        link: "/games",
      },
      {
        text: "exclusive-games",
        link: "/exclusive-games",
      },
      {
        text: "providers",
        link: "/providers",
      },
    ],
  },
];
