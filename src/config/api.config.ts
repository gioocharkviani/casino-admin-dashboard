import { handleGetAuthCookie } from '@/utils/token';

interface PropsTypes {
  url: string;
  method?: RequestInit['method'];
  headers?: RequestInit['headers'];
  body?: object;
  revalidate?: NextFetchRequestConfig['revalidate'];
  tags?: NextFetchRequestConfig['tags'];
  dataType?: 'text' | 'json';
}

const checkStatusCode = (statusCode: number) => {
  switch (statusCode) {
    case 200:
      return { message: 'OK', isSuccess: true };
    case 201:
      return { message: 'Created', isSuccess: true };
    case 400:
      return { message: 'Bad Request', isSuccess: false };
    case 401:
      return { message: 'Unauthorized', isSuccess: false };
    case 403:
      return { message: 'Forbidden', isSuccess: false };
    case 404:
      return { message: 'Not Found', isSuccess: false };
    case 500:
      return { message: 'Internal Server Error', isSuccess: false };
    default:
      return { message: 'Unexpected status code', isSuccess: false };
  }
};

export const api = async ({
  url,
  method = 'GET',
  body = {},
  headers,
  revalidate = 3600,
  tags = [],
  dataType = 'json', // Default response type as JSON
}: PropsTypes) => {
  try {
    const token = handleGetAuthCookie();

    // Configure fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Only add Authorization header if the token exists
        ...headers,
      },
    };

    // Only include the body for non-GET methods
    if (method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    // Add Next.js caching options if applicable
    const nextConfig =
      revalidate || tags.length > 0 ? { next: { revalidate, tags } } : {};

    // Make the API request
    const res = await fetch(url, {
      ...fetchOptions,
      ...nextConfig,
    });

    // Handle status codes
    const statusInfo = checkStatusCode(res.status);

    // If status code is not successful, return error with the status message
    if (!statusInfo.isSuccess) {
      const errorText = await res.text();
      return {
        statusCode: res.status,
        message: statusInfo.message,
        errorText,
      };
    }

    // Handle the response based on the expected data type
    const data = dataType === 'text' ? await res.text() : await res.json();

    return {
      statusCode: res.status,
      message: statusInfo.message,
      data,
    };
  } catch (err) {
    console.error(`Error during API request to ${url}:`, err);
    throw new Error(err?.toString() || 'An API error occurred');
  }
};
