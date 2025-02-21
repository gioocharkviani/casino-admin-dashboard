import React, { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";
import TransactionsList from "./_components/TransactionsList";

const transactionsPage = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <TransactionsList />
      </Suspense>
    </div>
  );
};

export default transactionsPage;
