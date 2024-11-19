import React, { Suspense } from "react";
import BlackListUsers from "../_components/BlackListUsersList";
import TableLoader from "@/components/loaders/tableLoader";

const pageBlacklist = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <BlackListUsers />
      </Suspense>
    </div>
  );
};

export default pageBlacklist;
