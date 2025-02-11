"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { DashboardGames } from "@/types";
import React from "react";

const NewGamesList = ({ data }: { data: DashboardGames }) => {
  const tableOptions: TableOptions = {
    search: false,
    select: true,
    rowUniqueKey: {
      key: "game",
      value: "id",
    },
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
    pagination: false,
    sort: false,
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
      actions: [
        {
          name: "addToFav",
          type: "MODAL",
          link: "",
          key: "id",
          //   icon:
          //   component: ,
        },
      ],
    },
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="m-[10px] text-lg font-bold">New games</h2>
      <Table data={data} metaData={[]} options={tableOptions} />
    </div>
  );
};

export default NewGamesList;
