import { api } from '@/config';
import { handleGetAuthCookie } from '@/utils/token';

// GET ALL NOTIFICATION
export const getAllNotification = async ({
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

export const markNotificationAsRead = async ({
  apiUrl,
  token,
}: {
  apiUrl: string;
  token?: string;
}) => {
  try {
    const response = await api({
      url: apiUrl,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusCode !== 200) {
      return { error: response.errorText };
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch users' };
  }
};

//REMOVE USER FROM BLACKLIST
export const removeNotificatiopn = async (id: number) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_NEST_API_URL;
  const token = await handleGetAuthCookie();
  try {
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${backendUrl}/notification/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const resJson = await response.json();
      throw new Error(resJson.message || 'Error duaring remove notification');
    }

    return response;
  } catch (error: any) {
    console.error('Error activating user:', error.message);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};
