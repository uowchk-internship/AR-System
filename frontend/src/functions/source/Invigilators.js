const axios = require('axios');

//examInvigilator
export const saveExamInvigilator = async (url, data, code) => {
    let result = {}
    url += "/api/source/examInvigilator/"
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

export const getExamInvigilatorCount = async (url, code) => {
    let result = 0
    url += "/api/source/examInvigilator/count/" + code
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


export const getExamInvigilatorItems = async (url, code) => {
    let result = {}
    url += "/api/source/examInvigilator/" + code
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

export const getFirst10RowOfItem = async (url, code) => {
    let result = {}
    url += "/api/source/examInvigilator/first10Rows/" + code
    console.log(url)
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

export const clearExamInvigilator = async (url, code) => {
    let result = ""
    url += "/api/source/examInvigilator/remove/" + code
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