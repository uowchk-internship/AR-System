const axios = require('axios');

export const getTempExecuteResult = async (url, idList) => {
    let result = ""
    url += "/api/report/grade/tempResult"
    await axios.post(url, idList)
        .then((response) => {
            if (response.status === 200) {
                result = response.data
            } else {
                result = "No response from server"
            }
        })
        .catch((err) => {
            result = "No response from server"
            console.log(err)
        })

    return result
}

export const generateWithId = async (url) => {
    let result = ""
    url += "/api/report/grade/generateWithId"
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


export const updateHashmap = async (url) => {
    let result = ""
    url += "/api/report/grade/updateHashmap"
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