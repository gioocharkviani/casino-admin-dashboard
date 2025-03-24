import { handleGetAuthCookie } from "@/utils/token";
const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;

export const uploadFile = async (file: any) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/upload/image`, {
      method: "POST",
      body: file,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    return error;
  }
};
