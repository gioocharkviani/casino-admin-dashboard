import React from "react";
import ProviderList from "./_components/ProviderList";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <ProviderList />
    </div>
  );
};

export default page;
