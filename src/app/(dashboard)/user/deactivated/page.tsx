import React, { Suspense } from "react";
import DeactivatedUserList from "../_components/DeactivatedUsersList";
import TableLoader from "@/components/loaders/tableLoader";

const pageDeactivated = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <DeactivatedUserList />
      </Suspense>
    </div>
  );
};

export default pageDeactivated;
