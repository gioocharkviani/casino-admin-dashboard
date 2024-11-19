import React, { Suspense } from "react";
import UserList from "./_components/UserList";
import TableLoader from "@/components/loaders/tableLoader";

const pageUsers = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <UserList />
      </Suspense>
    </div>
  );
};

export default pageUsers;
