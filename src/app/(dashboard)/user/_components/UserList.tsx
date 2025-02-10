"use client";
import { useEffect, useState } from "react";
import { getAllUser } from "@/services";
import DeactiveUserComp from "./DeactiveUserComp";
import BlackListAddComp from "./BlackListAddComp";
import GeneralSettings from "./GeneralSettings";
import { useSearchParams } from "next/navigation";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import AssignLvlComp from "./AssignLvlComp";

import { SiLevelsdotfyi } from "react-icons/si";
import { LuUserCircle } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const UserList = () => {
  const searchParams = useSearchParams();
  const [tableData, setTableData] = useState();
  const [meta, setMeta] = useState();

  //query params
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const perPage = searchParams.get("per_page") || 10;
  const sortBy = searchParams.get("sort_by") || "";
  const sortDirection = searchParams.get("sort_direction") || "";

  useEffect(() => {
    const fetchFunc = async () => {
      const endpoint = `?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
      try {
        const res = await getAllUser(endpoint);
        setTableData(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [page, search, perPage, sortBy, sortDirection]);

  const tableOptions: TableOptions = {
    uniqueKey: "id",
    search: true,
    select: true,
    image: {
      active: false,
      imageDataKey: "img",
    },
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: true,
    sort: true,
    settings: {
      title: "usersTable",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    actions: {
      active: true,
      actions: [
        {
          name: "user logs",
          type: "LINK",
          link: "/user/logs/",
          icon: <LuUserCircle />,
          key: "id",
        },
        {
          name: "Deactive",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <MdLockOutline />,
          component: DeactiveUserComp,
        },
        {
          name: "add to blacklist",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <FaUserLock />,
          component: BlackListAddComp,
        },
        {
          name: "assign level",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <SiLevelsdotfyi />,
          component: AssignLvlComp,
        },
        {
          name: "General",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <IoSettingsOutline />,
          component: GeneralSettings,
        },
      ],
    },
  };

  return <Table data={tableData} metaData={meta} options={tableOptions} />;
};

export default UserList;
