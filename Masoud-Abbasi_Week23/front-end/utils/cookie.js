export const setCookie = (token) => {
  if (typeof window === "undefined") {
    return null;
  } else {
    document.cookie = `accessToken=${token};max-age=${1 * 24 * 60 * 60}`;
  }
};

export const getCookie = () => {
  if (typeof window === "undefined") {
    return null;
  } else {
  }
  const token = document.cookie.split("accessToken=")[1];
  return token;
};
