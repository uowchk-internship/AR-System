import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo12, getArgo12Count, getFirst10RowOfItem, clearArgo12 } from '../../../functions/source/Argo12'

const Argo12 = (props) => {
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
        await clearArgo12(url)
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
            let jsonObj = {
                id: 0,
                termCode: (item["TermCode"] === undefined) ? "" : item["TermCode"],
                pidm: (item["PIDM"] === undefined) ? "" : item["PIDM"],
                crn: (item["CRN"] === undefined) ? "" : item["CRN"],
                studNo: (item["StudNo"] === undefined) ? "" : item["StudNo"],
                studentName: (item["StudentName"] === undefined) ? "" : item["StudentName"],
                gender: (item["Gender"] === undefined) ? "" : item["Gender"],
                courseCode: (item["CourseCode"] === undefined) ? "" : item["CourseCode"],
                courseOfferDept: (item["CourseOfferDept"] === undefined) ? "" : item["CourseOfferDept"],
                enrolStatus: (item["EnorlStatus"] === undefined) ? "" : item["EnorlStatus"],
                courseTitle: (item["CourseTitle"] === undefined) ? "" : item["CourseTitle"],
                subjType: (item["SubjType"] === undefined) ? "" : item["SubjType"],
                progCode: (item["ProgCode"] === undefined) ? "" : item["ProgCode"],
                cohort: (item["Cohort"] === undefined) ? "" : item["Cohort"],
            }
            jsonObjects.push(jsonObj);
        }

        // console.log(JSON.stringify(jsonObjects));

        await saveArgo12(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo12Count(url))
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
                <h2>Argo12</h2>
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
                            Clear all argo12 data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="argo12Upload">
                            <Button
                                onClick={() => document.getElementById('argo12Upload').click()}
                                loading={loading}>
                                Upload argo12
                            </Button>
                        </label>
                        <input hidden type="file" id="argo12Upload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    );
}

export default Argo12;
