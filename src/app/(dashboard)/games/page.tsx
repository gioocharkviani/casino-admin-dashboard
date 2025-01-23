import React, { Suspense } from "react";
import GameList from "./components/GameList";
import TableLoader from "@/components/loaders/tableLoader";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <GameList />
      </Suspense>
    </div>
  );
};

export default page;
