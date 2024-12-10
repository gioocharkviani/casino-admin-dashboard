import React from "react";
import ExclusiveGameList from "./_components/ExclusiveGameList";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <ExclusiveGameList />
    </div>
  );
};

export default page;
