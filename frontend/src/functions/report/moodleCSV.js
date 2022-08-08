const axios = require('axios');

export const downloadSingleCSV = async (url, courseCode) => {
    let result = ""
    url += "/api/report/moodleCSV/single/"+courseCode
    await axios.get(url)
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                console.log(response.data)
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
