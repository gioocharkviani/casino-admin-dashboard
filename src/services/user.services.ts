import { api } from "@/config";



// Removed NextRequest and simplified for component use
export const getAllUser = async ({ apiUrl , token}: { apiUrl: string , token?:string}) => {
  try {
    const response = await api({
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
