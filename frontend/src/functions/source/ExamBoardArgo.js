const axios = require('axios');

//ExamBoardArgo
export const saveExamBoardArgo = async (url, data) => {
    let result = {}
    url+="/api/source/examBoardArgo/"
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

export const getExamBoardArgoCount = async (url) => {
    let result = 0
    url += "/api/source/examBoardArgo/count"
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

export const getExamBoardArgoItems = async (url) => {
    let result = {}
    url += "/api/source/examBoardArgo/"
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
    url += "/api/source/examBoardArgo/first10Rows"
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


export const clearExamBoardArgo = async (url) => {
    let result = ""
    url += "/api/source/examBoardArgo/removeAll"
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