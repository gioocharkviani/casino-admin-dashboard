import React from "react";
import GameList from "./components/GameList";

const page = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <GameList />
    </div>
  );
};

export default page;
