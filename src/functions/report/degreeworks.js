const axios = require('axios');

export const getTempExecuteResult = async (url) => {
    let result = ""
    url += "/api/report/grade/tempResult"
    await axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                result = response.data
            } else {
                result = "No response from server"
            }
        })
        .catch((err) => {
            result = "No response from server"
        })

    return result
}
