import React, { Suspense } from "react";
import EditNotifi from "../_components/EditNotifi";

const page = () => {
  return (
    <div className="w-full bg-white p-2 relative rounded-md dark:bg-darkBlue">
      <Suspense fallback={""}>
        <EditNotifi />
      </Suspense>
    </div>
  );
};

export default page;
