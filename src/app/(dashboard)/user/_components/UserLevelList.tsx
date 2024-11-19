"use client";
import { useEffect, useState } from "react";
import Table from "@/components/tables/Table";
import useTableStore from "@/store/useTableStore";
import { getAllUser, getUserLevel } from "@/services";
import { handleGetAuthCookie } from "@/utils/cookies";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { MdLockOpen } from "react-icons/md";
import ActiveUserComp from "./ActiveUserComp";
import { useSearchParams } from "next/navigation";

const UserLevelList = () => {
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
        const res = await getUserLevel(endpoint);
        setTableData(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [searchParams]);

  const tableOptions: TableOptions = {
    uniqueKey: "id",
    search: true,
    select: true,
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: false,
    sort: true,
    settings: {
      title: "UserLevels",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    actions: {
      active: false,
      actions: [
        {
          name: "active",
          type: "MODAL",
          icon: <MdLockOpen />,
          key: "user_id",
          link: "",
          component: ActiveUserComp,
        },
      ],
    },
  };

  return (
    <div>
      <Table data={tableData} metaData={meta} options={tableOptions} />
    </div>
  );
};

export default UserLevelList;
