import Table from "@/components/tables/Table";
import { TableOptions } from "@/components/tables/tableOptions.types";
import { DashboardGames } from "@/types";
import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import DeleteGame from "./DeleteGame";
import AddGameComp from "./AddGame";
import UpdateGame from "./EditGame";
import { MdUpdate } from "react-icons/md";

const TopGamesList = ({ data }: { data: DashboardGames }) => {
  const someDiv = `HERE WILL BE TOP GAME ELEMENT`;

  const tableOptions: TableOptions = {
    search: false,
    rowUniqueKey: {
      key: "game",
      value: "id",
    },
    select: true,
    image: {
      active: true,
      inObjectKey: "game",
      imageDataKey: "img",
    },
    saveData: false,
    pagination: false,
    sort: false,
    settings: {
      title: "TopGamesList",
      active: true,
    },
    create: {
      active: true,
      link: "",
      type: "MODAL",
      title: "ADD TOP GAME",
      component: AddGameComp,
      key: "top",
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
      <h2 className="m-[10px] text-lg font-bold">Top games</h2>
      <Table data={data} options={tableOptions} />
    </div>
  );
};

export default TopGamesList;
