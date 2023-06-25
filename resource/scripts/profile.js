const baseURLProfile = window.location.href.split("/").slice(0, 3).join("/");
const history = document.getElementById("history");
const game = document.getElementById("gameButton");
const heading = document.getElementById("displayEmail");
const userHeader = document.getElementById("displayName")
const newUser = document.getElementById("getNewUsername");


const getUser = async () => {
  const data = {
    token: sessionStorage.getItem("jwtToken")
  }

  const user = await fetch(`${baseURLProfile}/profile/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const userData = await user.json();
  if (user !== null) {
    heading.textContent = userData;
  }

  const username = await fetch(`${baseURLProfile}/profile/username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(username)
  const usernameData = await username.json();
  if (username !== null) {
    userHeader.textContent = usernameData;
  }
};

game.addEventListener("click", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token") || null;
    if (!token) {
      token = sessionStorage.getItem("jwtToken");
    }
    if (token !== null) {
      const url = "/Game";
      window.location.href = `${url}?token=${token}`;
    }
  } catch (e) {
    console.log(e);
  }
});

history.addEventListener("click", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token") || null;
    if (!token) {
      token = sessionStorage.getItem("jwtToken");
    }
    if (token !== null) {
      const url = "/history";
      window.location.href = `${url}?token=${token}`;
    }
  } catch (e) {
    console.log(e);
  }
});


newUser.addEventListener('click', async () => {
  const data = {
    token: sessionStorage.getItem("jwtToken")
  }
  newUser.disabled = true;
  const username = await fetch(`${baseURLProfile}/profile/generateUsername`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  newUser.disabled = false;
  console.log(username)
  const usernameData = await username.json();
  if (username !== null) {
    userHeader.textContent = usernameData;
  }

})

getUser();
