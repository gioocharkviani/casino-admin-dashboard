"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import React from "react";

const NewGamesList = (data: any) => {
  const tableOptions: TableOptions = {
    search: false,
    select: true,
    image: {
      active: true,
      inObjectKey: "game",
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
      title: "NewGamesList",
      active: true,
    },
    create: {
      active: false,
      link: "",
    },
    actions: {
      active: true,
      actions: [],
    },
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="m-[10px] text-lg font-bold">New games</h2>
      <Table data={data.data} options={tableOptions} />
    </div>
  );
};

export default NewGamesList;
