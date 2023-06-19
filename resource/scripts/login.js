const baseUrl = window.location.href.split("/").slice(0, 3).join("/");
const authUrl = baseUrl.replace("3001", "3000");
const loginButton = document.getElementById("loginButton");
const googleLoginButton = document.getElementById("googleLoginButton");
const githubLoginButton = document.getElementById("githubLoginButton");
const usernameInput = document.getElementById("username");

googleLoginButton.addEventListener("click", async () => {
  window.location.href = "/Login/google";
});

githubLoginButton.addEventListener("click", async () => {
  window.location.href = "/Login/github";
});

loginButton.addEventListener("click", async () => {
  const user = usernameInput.value;
  const data = {
    email: user,
  };

  try {
    let storedToken = localStorage.getItem("jwtToken") || null;
    if (!storedToken) {
      await getToken(data);
      storedToken = localStorage.getItem("jwtToken");
    }
    checkToken(storedToken);
  } catch (error) {
    console.log(error);
  }
});

const checkToken = async (token) => {
  const data = { token: token };
  const response = await fetch(`${authUrl}/login/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const message = await response.json();
  } else {
    throw new Error("Error: " + response.status);
  }
};

const getToken = async (data) => {
  const response = await fetch(`${authUrl}/login/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const token = await response.json();
    localStorage.setItem("jwtToken", token);
  } else {
    throw new Error("Error: " + response.status);
  }
};
