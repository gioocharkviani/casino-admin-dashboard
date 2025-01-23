import React from "react";
import ProviderList from "./_components/ProviderList";
import { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <ProviderList />
      </Suspense>
    </div>
  );
};

export default page;
