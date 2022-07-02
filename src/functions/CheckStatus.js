const axios = require('axios');

export const checkStatus = async (url) => {
    let result = false

    await axios.get(url)
        .then((response) => {
            console.log("response")
            console.log(response)
            if (response.status === 200) {
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
