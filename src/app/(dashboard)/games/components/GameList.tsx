"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { getAllGames } from "@/services";
import React, { useEffect, useState } from "react";

const GameList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await getAllGames();
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
      imageDataKey: "img",
    },
    filter: {
      active: false,
      filterBy: [],
    },
    saveData: true,
    pagination: true,
    sort: false,
    settings: {
      title: "allGames",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    actions: {
      active: false,
      actions: [],
    },
  };
  return (
    <div>
      <Table options={tableOptions} data={data} />
    </div>
  );
};

export default GameList;
