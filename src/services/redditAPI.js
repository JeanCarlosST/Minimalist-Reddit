const clientID = "";
const secret = "";
const redirectUrl = `http://localhost:5173/`;
const baseURL = "https://www.reddit.com/api/v1";
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function authorizeUser() {
    const state = generateString(32);

    localStorage.setItem("state", state);

    const url = `${baseURL}/authorize?client_id=${clientID}&response_type=code&state=${state}&redirect_uri=${redirectUrl}&duration=temporary&scope=read identity`
    
    window.location.assign(url);
}

export function getAccessToken(state, code) {
    const savedState = localStorage.getItem("state");
    const accessToken = localStorage.getItem("accessToken");

    if(!savedState || !state || !code)
        return;
    
    const url = `${baseURL}/access_token`;
    const credentials = window.btoa(`${clientID}:${secret}`);

    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Basic ${credentials}`
        },
        body: new URLSearchParams({
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirectUrl
        })
    })
    .then(response => {
        return response.json();
    })
    .then(jsonResponse => {
        console.log(jsonResponse);

        const accessToken = jsonResponse['access_token'];
        const expiresIn = jsonResponse['expires_in'];
        const refreshToken = jsonResponse['refresh_token'];

        if(accessToken)
            localStorage.setItem('accessToken', accessToken);
            
        if(expiresIn)
            localStorage.setItem('expiresIn', expiresIn);
        
        if(refreshToken)
            localStorage.setItem('refreshToken', refreshToken);
    })
    .catch(error => {
        console.log(error);
    })

}