"use client";
import { useEffect, useState } from "react";
import Table from "@/components/tables/Table";
import { getDeactivatedUser } from "@/services";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { MdLockOpen } from "react-icons/md";
import ActiveUserComp from "./ActiveUserComp";
import { useSearchParams } from "next/navigation";
import useRefetchStore from "@/store/useRefetchStore";

const DeactivatedUserList = () => {
  const searchParams = useSearchParams();
  const [tableData, setTableData] = useState();
  const [meta, setMeta] = useState();
  const { refetch } = useRefetchStore();

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
        const res = await getDeactivatedUser(endpoint);
        setTableData(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [page, search, perPage, sortBy, sortDirection, refetch]);

  const tableOptions: TableOptions = {
    uniqueKey: "id",
    search: true,
    select: true,
    image: {
      active: false,
      imageDataKey: "img",
    },
    saveData: true,
    pagination: false,
    sort: true,
    settings: {
      title: "deactiveUsersTable",
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

export default DeactivatedUserList;
