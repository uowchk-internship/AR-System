const axios = require('axios');

//programPlan
export const saveProgramPlan = async (url, data) => {
    let result = {}
    url+="/api/programPlan/"
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
    url += "/api/programPlan/count"
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
    url += "/api/programPlan/"
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
    url += "/api/programPlan/removeAll"
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