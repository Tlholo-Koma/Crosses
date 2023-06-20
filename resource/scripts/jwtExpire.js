const removeExpiredTokens = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const tokenData = parseJwt(jwtToken);
      if (tokenData.exp && Date.now() >= tokenData.exp * 1000) {
        // Token has expired, remove it from local storage
        localStorage.removeItem("jwtToken");
      }
    }
  };
  
  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

removeExpiredTokens();