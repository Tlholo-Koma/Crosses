try{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        localStorage.setItem('jwtToken', token);
        console.log("Yaaa'll its working!!!!");
        console.log("token")
        console.log(token)
    }
}catch(e){
    console.log(e);
}


