import { api } from '@/config';

// GET ALL USER
export const getAllUser = async ({
  apiUrl,
  token,
}: {
  apiUrl: string;
  token?: string;
}) => {
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText }; // Handle error case
    }

    return response.data; // Assuming you return data from the API
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch users' };
  }
};

// GET USER LOG
export const getUserLog = async ({
  apiUrl,
  token,
}: {
  apiUrl: string;
  token?: string;
}) => {
  try {
    const response = await api({
      url: apiUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText }; // Handle error case
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch users' };
  }
};

//GET CURRENT USER
export const currentUser = async (token: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;
  try {
    const response = await api({
      url: `${backendUrl}/user`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for different response status codes
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return {
        statusCode: response.statusCode,
        message: 'OK',
        data: response.data,
      };
    } else {
      // Handle non-200 status codes
      return {
        statusCode: response.statusCode,
        message: 'Non-OK response',
        data: null,
      };
    }
  } catch (error: any) {
    console.error('Error fetching current user:', error.message || error);

    // Handle any errors during the API call
    return {
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || 'Internal server error',
      data: null,
    };
  }
};
