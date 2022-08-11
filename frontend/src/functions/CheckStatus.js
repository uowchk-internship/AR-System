const axios = require('axios');

export const checkServerStatus = async (url) => {
    let result = false
    url += '/'

    await axios.get(url)
        .then((response) => {
            if (response.status === 200 && response.data === "Hello world" ) {
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
