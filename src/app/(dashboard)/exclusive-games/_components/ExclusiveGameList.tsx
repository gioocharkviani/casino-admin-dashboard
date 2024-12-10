"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { getExclusiveGames } from "@/services";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";

const ExclusiveGameList = () => {
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  //query params
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const perPage = searchParams.get("per_page") || 10;
  const sortBy = searchParams.get("sort_by") || "";
  const sortDirection = searchParams.get("sort_direction") || "";

  useEffect(() => {
    const endpoint = `?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_direction=${sortDirection}&search=${search}`;
    const getGames = async () => {
      try {
        const res = await getExclusiveGames(endpoint);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGames();
  }, [searchParams]);

  const tableOptions: TableOptions = {
    search: false,
    select: true,
    image: {
      active: true,
      imageDataKey: "img",
    },
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: false,
    sort: false,
    settings: {
      title: "exclusiveGames",
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

export default ExclusiveGameList;
