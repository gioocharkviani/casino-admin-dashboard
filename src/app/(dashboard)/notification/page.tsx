import NotifiList from "./_components/NotifiList";
import { Suspense } from "react";
import TableLoader from "@/components/loaders/tableLoader";

export default async function notification() {
  return (
    <div className="bg-white flex  flex-col text-black p-2 transition-all rounded-md dark:bg-darkBlue dark:text-white">
      <Suspense fallback={<TableLoader />}>
        <NotifiList />
      </Suspense>
    </div>
  );
}
