"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { getAllProviders } from "@/services";
import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";

const ProviderList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await getAllProviders();
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGames();
  }, []);

  const tableOptions: TableOptions = {
    search: false,
    select: true,
    image: {
      active: true,
      imageDataKey: "logo",
    },
    saveData: true,
    pagination: true,
    sort: false,
    settings: {
      title: "getAllProviders",
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
          name: "addToFav",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <MdLockOutline />,
          component: "",
        },
      ],
    },
  };
  return (
    <div>
      <Table options={tableOptions} data={data} />
    </div>
  );
};

export default ProviderList;
