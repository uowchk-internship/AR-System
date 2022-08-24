import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo5, getArgo5Count, getFirst10RowOfItem, clearArgo5 } from '../../../functions/source/Argo5'

const Argo5 = (props) => {
    let setShowData = props.setShowData
    let setDisplayData = props.setDisplayData

    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [oldURL, setOldURL] = useState("")

    const clearData = async () => {
        setLoading(true)
        await clearArgo5(url)
        setLoaded(false)
        setLoading(false)
    }

    async function handleFileAsync(e) {
        setLoading(true)

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */
        let workbook = XLSX.read(data);
        workbook = workbook.Sheets[workbook.SheetNames[0]]
        // console.log(workbook);

        let fileJson = XLSX.utils.sheet_to_json(workbook);
        // console.log(fileJson);

        let jsonObjects = []
        for (let item of fileJson) {
            let rowId = (item["__rowNum__"] === undefined) ? 0 : item["__rowNum__"]
            rowId++;

            let startDateString = (workbook[`F${rowId}`].w === undefined) ? "" : workbook[`F${rowId}`].w.split('/');
            let endDateString = (workbook[`G${rowId}`].w === undefined) ? "" : workbook[`G${rowId}`].w.split('/');

            startDateString = `${startDateString[1]}/${startDateString[0]}/${startDateString[2]}`
            endDateString = `${endDateString[1]}/${endDateString[0]}/${endDateString[2]}`

            let jsonObj = {
                id: 0,
                termCode: (item["TermCode"] === undefined) ? "" : item["TermCode"],
                crn: (item["CRN"] === undefined) ? "" : item["CRN"],
                courseCode: (item["CourseCode"] === undefined) ? "" : item["CourseCode"],
                courseTitle: (item["CourseTitle"] === undefined) ? "" : item["CourseTitle"],
                lecTut: (item["Lec/Tut"] === undefined) ? "" : item["Lec/Tut"],
                startDate: startDateString,
                endDate: endDateString,
                mon: (item["Mon"] === undefined) ? "" : item["Mon"],
                tue: (item["Tue"] === undefined) ? "" : item["Tue"],
                wed: (item["Wed"] === undefined) ? "" : item["Wed"],
                thu: (item["Thu"] === undefined) ? "" : item["Thu"],
                fri: (item["Fri"] === undefined) ? "" : item["Fri"],
                sat: (item["Sat"] === undefined) ? "" : item["Sat"],
                sun: (item["Sun"] === undefined) ? "" : item["Sun"],
                time: (item["Time"] === undefined) ? "" : item["Time"],
                hrs: (item["Hrs"] === undefined) ? "" : item["Hrs"],
                responsibleStaff: (item["ResponsibleStaff"] === undefined) ? "" : item["ResponsibleStaff"],
                room: (item["Room"] === undefined) ? "" : item["Room"],
                classType: (item["ClassType"] === undefined) ? "" : item["ClassType"],
                staffEid: (item["StaffEID"] === undefined) ? "" : item["StaffEID"],
                courseOfferingFaculty: (item["CourseOfferingFaculty"] === undefined) ? "" : item["CourseOfferingFaculty"],
            }
            jsonObjects.push(jsonObj);
        }
        
        await saveArgo5(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo5Count(url))
            setLoaded(true)
            setOldURL(url)
        }

        if (!loaded) {
            fetchNumber()
        }
        if (url !== oldURL) {
            fetchNumber()
        }

    })


    return (
        <tr>
            <td>
                <h2>Argo5</h2>
            </td>

            <td>
                <Badge size="lg" variant="outline" color={(entryCount > 0) ? "" : "gray"}>
                    {loaded ?
                        <>
                            {(entryCount > 0) ?
                                `${entryCount} rows` : `Not yet upload`
                            }
                        </> :
                        <> Loading...</>
                    }
                </Badge>
            </td>
            <td>
                {(entryCount > 0) ?
                    <>
                        <Button
                            onClick={async () => {
                                setShowData(true)
                                setDisplayData(await getFirst10RowOfItem(url))
                            }}>
                            View First 10 Rows
                        </Button>

                        <Button
                            color="red"
                            loading={loading}
                            onClick={() => clearData()}>
                            Clear All Argo5 Data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="argo10Upload">
                            <Button
                                onClick={() => document.getElementById('argo5Upload').click()}
                                loading={loading}>
                                Upload argo5
                            </Button>
                        </label>
                        <input hidden type="file" id="argo5Upload" onChange={handleFileAsync} />
                    </>
                }
            </td>
        </tr >
    );
}

export default Argo5;
