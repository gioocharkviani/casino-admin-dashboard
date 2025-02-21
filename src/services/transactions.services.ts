const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
import { transactionsTypes } from "@/types";
import { handleGetAuthCookie } from "@/utils/cookies";

export const getAllTransactions = async (endpont: string | null) => {
  const token = await handleGetAuthCookie();
  try {
    const res = await fetch(`${backendUrl}/admin/transactions${endpont}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    return error;
  }
};

export const changeTransactionStatus = async (id: string | number, data: string | number) => {
  const token = await handleGetAuthCookie();
  const body = {
    status: data,
  };

  try {
    const res = await fetch(`${backendUrl}/admin/change-deposit-status/${id}`, {
      method: "POST",
      body: JSON.stringify(body),
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
