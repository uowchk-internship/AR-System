const axios = require('axios');

export const checkServerStatus = async (url) => {
    let result = false
    url += '/'

    await axios.get(url)
        .then((response) => {
            if (response.status === 200 && response.data === "Hello world") {
                result = true
            } else {
                result = false
            }
        })
        .catch((err) => {
            console.error(err)
            result = false
        })

    return result
}

export const Version = async (url) => {
    let result = ""
    url += '/version'

    await axios.get(url)
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                result = response.data
            }
        })
        .catch((err) => {
            console.error(err)
            result = ""
        })

    return result
}
