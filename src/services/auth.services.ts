import { api } from "@/config";

export const currentUser = async (token: string) => {
  try {
    const response = await api({
      url: "/user",
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

export const userLogin = async (body: object) => {
  try {
    const response = await api({
      url: "/auth/login",
      method: "POST",
      body: body,
    });

    if (response.statusCode === 200) {
      const userToken = response.data.access_token;
      const getUserAcess = await api({
        url: "/admin/my-roles",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (getUserAcess.statusCode === 403) {
        return getUserAcess;
      }
    }
    return response;
  } catch (error) {
    console.log("catch block");
    console.error("Error during user login:", error);
    throw error;
  }
};
