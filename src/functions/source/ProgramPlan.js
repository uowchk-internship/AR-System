const axios = require('axios');

//programPlan
export const saveProgramPlan = async (url, data) => {
    let result = {}
    url += "/api/source/programPlan/"
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

export const getProgramPlanCount = async (url) => {
    let result = 0
    url += "/api/source/programPlan/count"
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

export const getProgramPlanCountByYear = async (url, year) => {
    let result = 0
    url += "/api/source/programPlan/countByYear/" + year
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


export const getProgramPlanItems = async (url) => {
    let result = {}
    url += "/api/source/programPlan/"
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

export const getFirst10RowOfItem = async (url, year) => {
    let result = {}
    url += "/api/source/programPlan/first10Rows/" + year
    console.log("url: ")
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

export const clearProgramPlan = async (url) => {
    let result = ""
    url += "/api/source/programPlan/removeAll"
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