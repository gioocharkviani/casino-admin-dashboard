import { api } from '@/config';

const backendUrl = process.env.NEXT_PUBLIC_BACKEDND_BASE_API_URL;

export const userLogin = async (body: object) => {
  try {
    const response = await api({
      url: `${backendUrl}/auth/login`,
      method: 'POST',
      body: body,
    });

    if (response.statusCode === 200) {
      const userToken = response.data.data.access_token;
      const getUserAcess = await api({
        url: `${backendUrl}/user`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (getUserAcess.statusCode === 403) {
        return getUserAcess;
      }
    }
    return response;
  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
};
