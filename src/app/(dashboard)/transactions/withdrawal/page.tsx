import React, { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";
import WithdrawalTransactions from "../_components/WithdrawalTransactions";

const transactionsPage = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<TableLoader />}>
        <WithdrawalTransactions />
      </Suspense>
    </div>
  );
};

export default transactionsPage;
