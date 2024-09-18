import Cookies from "js-cookie";


const AUTH_COOKIE_NAME = "auth";

export const handleSetAuthCookie = token => {
  Cookies.set(AUTH_COOKIE_NAME, token, { expires: 1 });
};

export const handleGetAuthCookie = async () => {
  const cookieValue = await Cookies.get('auth');
  return cookieValue;
};

export const handleDeleteAuthCookie = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};