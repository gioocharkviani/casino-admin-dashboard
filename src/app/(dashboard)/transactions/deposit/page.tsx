import React, { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";
import DepositTransactions from "../_components/DepositTransactions";

const transactionsPage = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <DepositTransactions />
      </Suspense>
    </div>
  );
};

export default transactionsPage;
