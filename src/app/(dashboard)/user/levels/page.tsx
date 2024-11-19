import React, { Suspense } from "react";
import UserLevelList from "../_components/UserLevelList";
import TableLoader from "@/components/loaders/tableLoader";

const pageLevel = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <UserLevelList />
      </Suspense>
    </div>
  );
};

export default pageLevel;
