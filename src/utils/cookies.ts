'use server';
import { cookies } from 'next/headers';

export const handleGetAuthCookie = async (): Promise<any> => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');

  if (!authCookie) {
    return {
      statusCode: 401,
      message: 'Unauthorized',
    };
  }

  return authCookie.value;
};
