import { api } from '@/config';

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
