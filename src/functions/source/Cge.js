const axios = require('axios');

//Cge
export const saveCge = async (url, data) => {
    let result = {}
    url+="/api/source/cge/"
    await axios.post(url, data)
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

export const getCgeCount = async (url) => {
    let result = 0
    url += "/api/source/cge/count"
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

export const getCgeItems = async (url) => {
    let result = {}
    url += "/api/source/cge/"
    await axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                result = response.data
            }
        })
        .catch((err) => {
            console.log(err)
        })

    return result
}

export const getFirst10RowOfItem = async (url) => {
    let result = {}
    url += "/api/source/cge/first10Rows"
    await axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                result = response.data
            }
        })
        .catch((err) => {
            console.log(err)
        })

    return result
}


export const clearCge = async (url) => {
    let result = ""
    url += "/api/source/cge/removeAll"
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