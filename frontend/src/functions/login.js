import { saveJWT, getJWT } from './cookies';

const axios = require('axios');

export const login = async (url, username, password) => {
    let result = ""
    let body = {
        username: username,
        password: password
    }

    axios.defaults.headers.common['Authorization'] = ""

    url += '/login'
    await axios.post(url, body)
        .then((response) => {
            if (response.status === 200) {
                result = response.data
                axios.defaults.headers.common['Authorization'] = result
                saveJWT(result)
            } else {
                result = ""
            }
        })
        .catch((err) => {
            console.log(err);
            result = ""
        })

    return result

}

export const logout = () => {
    saveJWT("Bearer ")
    axios.defaults.headers.common['Authorization'] = ""
}

export const checkLoginStatus = async (url) => {
    let JWTFromCookie = getJWT();
    axios.defaults.headers.common['Authorization'] = JWTFromCookie

    let result = ""
    url += "/loginStatus/"
    await axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                result = response.data

            } else {
                result = ""
            }
        })
        .catch((err) => {
            console.log("err");
            console.log(err);
            result = ""
        })

    if (result === "demo" && !url.includes('johnnyip.com')) {
        result = ""
    }

    return result

}

