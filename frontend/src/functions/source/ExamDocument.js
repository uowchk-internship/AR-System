const axios = require('axios');

//ExamDocument
export const saveExamDocument = async (url, data) => {
    let result = {}
    url+="/api/source/examDocument/"
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

export const getExamDocumentCount = async (url) => {
    let result = 0
    url += "/api/source/examDocument/count"
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

export const getExamDocumentItems = async (url) => {
    let result = {}
    url += "/api/source/examDocument/"
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
    url += "/api/source/examDocument/first10Rows"
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


export const clearExamDocument = async (url) => {
    let result = ""
    url += "/api/source/examDocument/removeAll"
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