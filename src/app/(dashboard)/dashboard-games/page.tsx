import React, { Suspense } from "react";
import NewGamesList from "./_components/NewGamesList";
import TopGamesList from "./_components/TopGamesList";
import { getGamesForDashboartd } from "@/services";

const newGamesPage = async () => {
  const gameData = await getGamesForDashboartd();
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense>
        <div className="w-full flex flex-col gap-5">
          <NewGamesList data={gameData.data.new} />
          <TopGamesList data={gameData.data.top} />
        </div>
      </Suspense>
    </div>
  );
};

export default newGamesPage;
