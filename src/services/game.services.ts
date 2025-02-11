const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
import { createGamesByCategories, updateGameType } from "@/types";
import { handleGetAuthCookie } from "@/utils/cookies";

export const getAllGames = async (query?: String) => {
  try {
    const res = await fetch(`${backendUrl}/games${query}`, {
      method: "GET",
    });
    const result = res.json();
    return result;
  } catch (error) {
    return error;
  }
};

// exlusive game Service
export const addToFav = async (gameId: any) => {
  const id = typeof gameId === "object" ? gameId.id : gameId;
  try {
    const token = await handleGetAuthCookie();
    const response = await fetch(`${backendUrl}/admin/games/exclusives/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    console.error("Error exlusive game:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

//get exclusive games
export const getExclusiveGames = async (query?: String) => {
  try {
    const token = await handleGetAuthCookie();
    const response = await fetch(`${backendUrl}/games/exclusives${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error: any) {
    console.error("Error exlusive game:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

//get all providers
export const getAllProviders = async (query?: String | "") => {
  try {
    const response = await fetch(`${backendUrl}/providers`, {
      method: "GET",
    });
    return response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

//Get dashboard games
export const getGamesForDashboartd = async () => {
  try {
    const res = await fetch(`${backendUrl}/games/categories`, {
      method: "GET",
    });

    return res.json();
  } catch (error: any) {
    console.error(error.message || "An unexpected error occurred");
  }
};

//Delete dashboard Game By Category id
export const removeDashboardGame = async (id: string | number) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/games/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error: any) {
    console.error(error.message || "An unexpected error occurred");
  }
};

//add game by categories
export const addGamesByCategories = async (data: createGamesByCategories) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/games/categories/add`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error: any) {
    console.error(error.message || "An unexpected error occurred");
  }
};

//update game by categories
export const updateGamesByCategories = async (data: updateGameType) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/games/categories/update`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error: any) {
    console.error(error.message || "An unexpected error occurred");
  }
};
