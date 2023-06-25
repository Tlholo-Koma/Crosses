const baseUrl = window.location.href.split("/").slice(0, 3).join("/");
const authUrl = baseUrl.replace("3001", "3000");
const loginButton = document.getElementById("loginButton");
const googleLoginButton = document.getElementById("googleLoginButton");
const githubLoginButton = document.getElementById("githubLoginButton");
const usernameInput = document.getElementById("username");
const section = document.getElementById('inlineNotification');
let isSectionVisible = false;

const inlineNotification = async () =>{
  isSectionVisible = !isSectionVisible; // Toggle the boolean value
  if (isSectionVisible) {
    section.style.display = 'block'; // Show the section
    setTimeout(() => {
      section.style.display = 'none'; // Hide the section after 5 seconds
      isSectionVisible = false; // Update the boolean value
    }, 5000);
  } else {
    section.style.display = 'none'; // Hide the section
  }
}

googleLoginButton.addEventListener("click", async () => {
    window.location.href = '/Login/google';
});

githubLoginButton.addEventListener("click", async () => {
    window.location.href='/Login/github'
});

loginButton.addEventListener("click", async () => {
  const user = usernameInput.value;
  if(user.includes("@") &&
    user.includes(".") &&
    user.length >= 5){
      inlineNotification()
  }else{
    //display bad email input;
    
    return;
  }
  const data = {
    email: user,
  };

  try {
    let storedToken = sessionStorage.getItem("jwtToken") || null;
    if (!storedToken) {
      await getToken(data);
      storedToken = sessionStorage.getItem("jwtToken");
    }
    checkToken(storedToken);
    alert("Please check your email to login! :)")
  } catch (error) {
    console.log(error);
  }
});

const checkToken = async (token) => {
  const data = { token: token };
  const response = await fetch(`${baseUrl}/login/verify`, {
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
  const response = await fetch(`${baseUrl}/login/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const token = await response.json();
    sessionStorage.setItem("jwtToken", token);
  } else {
    throw new Error("Error: " + response.status);
  }
};



