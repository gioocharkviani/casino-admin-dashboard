import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlGameController } from "react-icons/sl";
import { MdOutlineDesignServices } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";

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
      {
        text: "dashboard-Games",
        link: "/dashboard-games",
      },
    ],
  },
  {
    text: "transactions",
    link: "/transactions",
    icon: AiOutlineTransaction,
    dropdown: [
      {
        text: "all transaction",
        link: "/transactions",
      },
      {
        text: "deposit",
        link: "/transactions/deposit",
      },
      {
        text: "withdrawal",
        link: "/transactions/withdrawal",
      },
    ],
  },
  {
    text: "themes",
    link: "",
    icon: MdOutlineDesignServices,
    dropdown: [
      {
        text: "main slider",
        link: "/main-slider",
      },
    ],
  },
];
