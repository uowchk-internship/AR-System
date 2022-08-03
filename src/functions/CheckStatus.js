const axios = require('axios');

export const checkStatus = async (url) => {
    let result = false
    url += '/api/source/argo10/count'

    await axios.get(url)
        .then((response) => {
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
