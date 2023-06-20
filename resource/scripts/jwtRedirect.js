const baseUrlRedirect = window.location.href.split("/").slice(0, 3).join("/");

const redirect = async () =>{
    
    
    try{
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token') || null;
        if(!token){
            token = localStorage.getItem('jwtToken')
        }
        if (token !== null) {
            localStorage.setItem('jwtToken', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
            console.log(token)
            const response = await axios.get(`${baseUrlRedirect}/game`)
            if (response.ok) {
                const message = await response.json();
                console.log("message back")
                console.log(message)
            } else {
                throw new Error("Error: " + response.status);
            }
    }
    }catch(e){
        console.log(e);
    }
    
}

redirect();


