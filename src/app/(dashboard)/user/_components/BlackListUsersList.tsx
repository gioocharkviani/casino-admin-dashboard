"use client";
import { useEffect, useState } from "react";
import Table from "@/components/tables/Table";
import { getBlockUsers } from "@/services";
import { TableOptions } from "@/components/tables/tableOptions.types";
import BlacklistUserRemvoveComp from "./BlacklistUserRemvoveComp";
import { FaUserCheck } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

const BlackListUsers = () => {
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
        const res = await getBlockUsers(endpoint);
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
      title: "blackListUsers",
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
          name: "remove",
          type: "MODAL",
          icon: <FaUserCheck />,
          key: "user_id",
          link: "",
          component: BlacklistUserRemvoveComp,
        },
      ],
    },
  };

  return (
    <div>
      <Table data={tableData} options={tableOptions} />
    </div>
  );
};

export default BlackListUsers;
