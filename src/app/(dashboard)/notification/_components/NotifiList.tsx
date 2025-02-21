"use client";
import { getAllNotification } from "@/services/notification.service";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import DeleteNotifi from "./DeleteNotifi";
import Table from "@/components/tables/Table";
import { useSearchParams } from "next/navigation";
import useRefetchStore from "@/store/useRefetchStore";
import { TableOptions } from "@/components/tables/tableOptions.types";

const NotifiList = () => {
  const searchParams = useSearchParams();
  const [tableData, setTableData] = useState();
  const [meta, setMeta] = useState();
  const { refetch } = useRefetchStore(state => state);

  //query params
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const perPage = searchParams.get("per_page") || "";
  const sortBy = searchParams.get("sort_by") || "";
  const sortDirection = searchParams.get("sort_direction") || "";

  useEffect(() => {
    const fetchFunc = async () => {
      const endpoint = ``;
      try {
        const res = await getAllNotification(endpoint);
        const last_page = res.meta.total_pages;
        const updatedMeta = {
          ...res.meta,
          last_page,
        };
        console.log(updatedMeta);
        setTableData(res.data);
        setMeta(updatedMeta);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFunc();
  }, [searchParams, refetch]);

  const tableOptions: TableOptions = {
    search: false,
    select: true,
    saveData: true,
    pagination: true,
    sort: true,
    settings: {
      title: "notificationTable",
      active: true,
    },
    create: {
      active: true,
      link: "/notification/create",
    },
    actions: {
      active: true,
      actions: [
        {
          name: "remove",
          type: "MODAL",
          icon: <AiOutlineDelete />,
          link: "",
          key: "id",
          component: DeleteNotifi,
        },
        {
          name: "edit",
          type: "LINK",
          icon: <FaRegEdit />,
          key: "id",
          link: "/notification/edit?id=",
          component: "",
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

export default NotifiList;
