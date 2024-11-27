import { api } from "@/config";
import { handleGetAuthCookie } from "@/utils/cookies";

const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
const backendNetsUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;

//QUERY PARAMS

// GET ALL USER
export const getAllUser = async (endpoint: String) => {
  const token = await handleGetAuthCookie();
  const apiUrl = `${backendUrl}/admin/users/${endpoint}`;
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
};

// GET ALL USER
export const getUserLevel = async (endpoint: String) => {
  const token = await handleGetAuthCookie();
  const apiUrl = `${backendUrl}/admin/level/${endpoint}`;
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText }; // Handle error case
    }

    return response.data; // Assuming you return data from the API
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
};

// GET BLACKLIST USER
export const getBlockUsers = async (endpoint: String) => {
  const token = await handleGetAuthCookie();
  const apiUrl = `${backendUrl}/admin/blacklist/${endpoint}`;
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
};

// GET Deactivated USER
export const getDeactivatedUser = async (endpoint: String) => {
  const token = await handleGetAuthCookie();
  const apiUrl = `${backendUrl}/admin/deactivated-users/${endpoint}`;
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
};

// GET USER LOG
export const getUserLog = async (endpoint: string) => {
  const token = await handleGetAuthCookie();
  const apiUrl = `${backendUrl}/admin/users/${endpoint}`;
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch users" };
  }
};

//GET CURRENT USER
export const currentUser = async (token: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
  try {
    const response = await api({
      url: `${backendUrl}/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for different response status codes
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return {
        statusCode: response.statusCode,
        message: "OK",
        data: response.data,
      };
    } else {
      // Handle non-200 status codes
      return {
        statusCode: response.statusCode,
        message: "Non-OK response",
        data: null,
      };
    }
  } catch (error: any) {
    console.error("Error fetching current user:", error.message || error);

    // Handle any errors during the API call
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || "Internal server error",
      data: null,
    };
  }
};

// DEACTIVE USER Service
export const deactiveUser = async ({ data }: any) => {
  try {
    const token = await handleGetAuthCookie();
    const response = await fetch(`${backendUrl}/admin/deactivated-users`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    // Handle error and display appropriate feedback
    console.error("Error deactivating user:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

//ACTIVE DEACTIVATED USER
export const avtiveUser = async (id: number) => {
  const token = await handleGetAuthCookie();
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${backendUrl}/admin/deactivated-users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resJson = await response.json();
      throw new Error(resJson.message || "Error in activating user");
    }

    return response;
  } catch (error: any) {
    console.error("Error activating user:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// ADD USER TO BLACKLIST
export const userToBlacklist = async ({ data }: any) => {
  try {
    const token = await handleGetAuthCookie();
    const response = await fetch(`${backendUrl}/admin/blacklist`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    // Handle error and display appropriate feedback
    console.error("Failed to add user to blacklist:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

//REMOVE USER FROM BLACKLIST
export const removeUserBlacklist = async (id: number) => {
  const token = await handleGetAuthCookie();
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${backendUrl}/admin/blacklist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resJson = await response.json();
      throw new Error(resJson.message || "Error in activating user");
    }

    return response;
  } catch (error: any) {
    console.error("Error activating user:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};
