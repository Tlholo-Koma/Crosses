const gameButton = document.getElementById('gameButton');

gameButton.addEventListener("click", async () => {
  try{
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token') || null;
    if(!token){
        token = localStorage.getItem('jwtToken')
    }
    if (token !== null) {
        const url = "/Game"
        window.location.href=`${url}?token=${token}`
}
}catch(e){
    console.log(e);
}
});


function randomWins(count) {
    const POSSIBLE_WINNERS = ["X", "O", "—"];
    resultWins = [];
    for(let i = 0; i < count; i++)
        resultWins.push(POSSIBLE_WINNERS[Math.floor(Math.random() * 3)]);    
    return resultWins;
}

function getWins ()
{
    // TODO: Retrieve the wins from the database and return as an array  
    return randomWins(100);
}

function addWinBlock (winsGrid, win, blockNumber)
{
    const section = document.createElement("section");
    const h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(blockNumber))
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(win))
    section.appendChild(h3);
    section.appendChild(p);
    winsGrid.appendChild(section);
}

function drawWins ()
{
    const winsGrid = document.getElementById("winsBlock");
    const wins = getWins();   
    wins.forEach((win, index)=>addWinBlock(winsGrid, win, index + 1));
}

drawWins();