export const routes = [
  {
    route: "/",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/user",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/user/deactivated",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/user/blacklist",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/user/levels",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/notification",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/games",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/exclusive-games",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/providers",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/dashboard-games",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/main-slider",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/transactions",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/transactions/deposit",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
  {
    route: "/transactions/withdrawal",
    access: ["SUPER_ADMIN", "ADMIN", "SUPPORT"],
  },
];
