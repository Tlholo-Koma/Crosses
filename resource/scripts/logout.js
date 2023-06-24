const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', ()=>{
    sessionStorage.removeItem('jwtToken');
    const url = "/login"
        window.location.href=`${url}`
})