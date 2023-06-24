// This could be split up into authorizedGet, authorizedPost etc
// We should use this to replace all use of axios
const authorizedFetch = async (url, method, token, body) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      Authentication: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  return response.json();
};

const authorizedRedirect = async (token, url) => {
  window.location.href = `${url}?token=${sessionStorage.getItem("jwtToken")}`;
};

module.exports = {
  authorizedFetch: function () {},
  authorizedRedirect: function () {},
};
