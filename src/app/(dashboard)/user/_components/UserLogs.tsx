"use client";
import Table from "@/components/tables/Table";
import React, { useEffect, useState } from "react";
import { getUserLog } from "@/services";
import { useParams, useSearchParams } from "next/navigation";

const UserLogs = () => {
  const params = useParams();
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
      const endpoint = `${params.id}/logs`;
      try {
        const res = await getUserLog(endpoint);
        setTableData(res.data);
        console.log(res);
        setMeta(res.meta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [searchParams, params.id]);

  const tableOptions = {
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
    pagination: false,
    sort: true,
    trclickaction: {
      active: false,
      link: "",
      component: "",
    },
    settings: {
      title: "UserLogTable",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    actions: {
      active: false,
      edit: "",
      remove: false,
    },
  };

  return (
    <div>
      <Table data={tableData} metaData={meta} options={tableOptions} />
    </div>
  );
};

export default UserLogs;
