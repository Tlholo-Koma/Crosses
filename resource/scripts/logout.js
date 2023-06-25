const logoutButton = document.getElementById('logoutButton')

logoutButton.addEventListener('click', ()=>{
    try{
        sessionStorage.removeItem('jwtToken');
        const url = "/login"
        window.location.href=`${url}`
    }catch{
        const url = "/login"
        window.location.href=`${url}`
    }  
})