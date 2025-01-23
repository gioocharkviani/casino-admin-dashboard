import React from "react";
import ExclusiveGameList from "./_components/ExclusiveGameList";
import { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <ExclusiveGameList />
      </Suspense>
    </div>
  );
};

export default page;
