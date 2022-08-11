export const saveJWT = (token) => {
    document.cookie = `JWT=${token}`;

    if (getCookie("JWT") === "") {
        alert("Cannot save cookie. Please allow it in browser setting.")
    }
}


export const getJWT = () => {
    return getCookie("JWT")
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}  
