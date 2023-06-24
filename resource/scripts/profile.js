const baseURLGame = window.location.href.split("/").slice(0, 3).join("/");
const history = document.getElementById('history');
const game = document.getElementById('gameButton');

game.addEventListener("click", async () => {
  try{
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token') || null;
    if(!token){
        token = sessionStorage.getItem('jwtToken')
    }
    if (token !== null) {
        const url = "/Game"
        window.location.href=`${url}?token=${token}`
}
}catch(e){
    console.log(e);
}
});

history.addEventListener("click", async () => {
  try{
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token') || null;
    if(!token){
        token = sessionStorage.getItem('jwtToken')
    }
    if (token !== null) {
        const url = "/Game/history"
        window.location.href=`${url}?token=${token}`
}
}catch(e){
    console.log(e);
}
});