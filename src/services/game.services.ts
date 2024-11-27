const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;

export const getAllGames = async () => {
  try {
    const res = await fetch(`${backendUrl}/games`, {
      method: "GET",
    });
    const result = res.json();
    return result;
  } catch (error) {
    return error;
  }
};
