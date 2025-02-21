"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { getAllGames } from "@/services";
import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";
import AddToFav from "./AddToFav";
import { useSearchParams } from "next/navigation";

const GameList = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState();
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
        const res = await getAllGames(endpoint);
        setData(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.log(error);
      }
    };
    getGames();
  }, [page, search, perPage, sortBy, sortDirection]);

  const tableOptions: TableOptions = {
    search: false,
    select: true,
    image: {
      active: true,
      imageDataKey: "img",
    },
    saveData: true,
    pagination: true,
    sort: true,
    settings: {
      title: "allGames",
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
          name: "addToFav",
          type: "MODAL",
          link: "",
          key: "id",
          icon: <MdLockOutline />,
          component: AddToFav,
        },
      ],
    },
  };
  return (
    <div>
      <Table options={tableOptions} metaData={meta} data={data} />
    </div>
  );
};

export default GameList;
