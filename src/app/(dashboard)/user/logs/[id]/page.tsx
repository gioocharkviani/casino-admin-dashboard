import React, { Suspense } from "react";
import UserLogs from "../../_components/UserLogs";
import TableLoader from "@/components/loaders/tableLoader";

const page = () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <UserLogs />
      </Suspense>
    </div>
  );
};

export default page;
