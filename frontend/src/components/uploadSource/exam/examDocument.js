import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveExamDocument, getExamDocumentCount, getFirst10RowOfItem, clearExamDocument } from '../../../functions/source/ExamDocument'

const ExamDocument = (props) => {
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
        await clearExamDocument(url)
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
                courseCode: (item["CourseCode"] === undefined) ? "" : item["CourseCode"],
                courseName: (item["CourseName"] === undefined) ? "" : item["CourseName"],
                courseTitle: (item["CourseTitle"] === undefined) ? "" : item["CourseTitle"],
                startDateTime: (item["StartDateTime"] === undefined) ? "" : item["StartDateTime"],
                endDateTime: (item["EndDateTime"] === undefined) ? "" : item["EndDateTime"],
                remarks: (item["Remarks"] === undefined) ? "" : item["Remarks"],
                locHostKey: (item["locHostKey"] === undefined) ? "" : item["locHostKey"],
                venue: (item["Venue"] === undefined) ? "" : item["Venue"],
                locName: (item["locName"] === undefined) ? "" : item["locName"],
                zoneName: (item["zoneName"] === undefined) ? "" : item["zoneName"],
                zoneDescription: (item["zoneDescription"] === undefined) ? "" : item["zoneDescription"],
                seatNo: (item["SeatNo"] === undefined) ? "" : item["SeatNo"],
                studentHostKey: (item["StudentHostKey"] === undefined) ? "" : item["StudentHostKey"],
                stuDisplayName: (item["stuDisplayName"] === undefined) ? "" : item["stuDisplayName"],
                examPeriodName: (item["ExamPeriodName"] === undefined) ? "" : item["ExamPeriodName"],
                examPeriodDescription: (item["ExamPeriodDescription"] === undefined) ? "" : item["ExamPeriodDescription"],
            }
            jsonObjects.push(jsonObj);
        }

        await saveExamDocument(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getExamDocumentCount(url))
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
                <h2>Exam Document</h2>
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
                            Clear All Exam Document Data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="examDocumentUpload">
                            <Button
                                onClick={() => document.getElementById('examDocumentUpload').click()}
                                loading={loading}>
                                Upload Exam Document
                            </Button>
                        </label>
                        <input hidden type="file" id="examDocumentUpload" onChange={handleFileAsync} />
                    </>
                }
            </td>
        </tr >
    );
}

export default ExamDocument;
