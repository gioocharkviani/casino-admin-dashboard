"use client";
import React, { Suspense, useEffect, useState } from "react";
import NewGamesList from "./_components/NewGamesList";
import TopGamesList from "./_components/TopGamesList";
import { getGamesForDashboartd } from "@/services";
import useRefetchStore from "@/store/useRefetchStore";
import { DashboardGames } from "@/types";

const NewGamesPage: React.FC = () => {
  // Fix useState initialization with correct type
  const [gameData, setGameData] = useState<any>([]);

  // Get refetch function from store
  const { refetch } = useRefetchStore(state => state);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const data = await getGamesForDashboartd();
        setGameData(data.data);
      } catch (error) {
        console.error("Failed to fetch game data:", error);
      }
    };

    fetchGameData();
  }, [refetch]);

  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full flex flex-col gap-5">
          {gameData ? (
            <>
              <NewGamesList data={gameData?.new} />
              <TopGamesList data={gameData?.top} />
            </>
          ) : (
            <div className="text-center text-gray-500">Loading games...</div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default NewGamesPage;
