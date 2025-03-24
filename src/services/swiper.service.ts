import { UpdateSwiper } from "@/types";
import { handleGetAuthCookie } from "@/utils/token";
import { revalidatePath } from "next/cache";
const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;

export const createSwiper = async (data: any) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/swiper/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllSwiperData = async () => {
  const token = await handleGetAuthCookie();
  console.log("Token:", token);

  try {
    const res = await fetch(`${backendUrl}/swiper/getAllAdmin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    return error;
  }
};

export const removeSlide = async (id: number) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/swiper/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const updateSlide = async (id: number, data: any) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/swiper/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (error) {
    return error;
  }
};
