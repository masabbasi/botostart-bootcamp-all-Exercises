export const setCookie = (token) => {
  document.cookie = `accessToken=${token};max-age=${1 * 24 * 60 * 60}`;
};

export const getCookie = () => {
  const token = document.cookie.split("accessToken=")[1];
  return token;
};
