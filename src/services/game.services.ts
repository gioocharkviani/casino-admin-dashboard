const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
import { handleGetAuthCookie } from "@/utils/cookies";
import { error } from "console";

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
