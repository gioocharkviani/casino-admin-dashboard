"use client";
import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { DashboardGames } from "@/types";
import React from "react";
import DeleteGame from "./DeleteGame";

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import AddGameComp from "./AddGame";
import UpdateGame from "./EditGame";

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
    saveData: false,
    pagination: false,
    sort: false,
    settings: {
      title: "NewGamesList",
      active: true,
    },
    create: {
      active: true,
      link: "",
      type: "MODAL",
      component: AddGameComp,
      title: "ADD NEW GAME",
      key: "new",
    },
    actions: {
      active: true,
      actions: [
        {
          name: "Remove",
          type: "MODAL",
          link: "",
          key: "category_id",
          icon: <IoIosRemoveCircleOutline />,
          component: DeleteGame,
        },
        {
          name: "Update",
          type: "MODAL",
          link: "",
          key: "game",
          icon: <MdUpdate />,
          component: UpdateGame,
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
