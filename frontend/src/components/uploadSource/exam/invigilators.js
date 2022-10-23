import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveexamInvigilator, getexamInvigilatorCount, getexamInvigilatorItems, getFirst10RowOfItem, clearexamInvigilator } from '../../../functions/source/Invigilators'

const Invigilators = (props) => {
    let setShowData = props.setShowData
    let setDisplayData = props.setDisplayData

    let displayName = props.displayName
    let code = props.code

    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [oldURL, setOldURL] = useState("")

    const clearData = async () => {
        setLoading(true)
        await clearexamInvigilator(url, code)
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
                studentId: (item["Student ID"] === undefined) ? "" : item["Student ID"],
                studentName: (item["Student Name"] === undefined) ? "" : item["Student Name"],
                programme: (item["Programme"] === undefined) ? "" : item["Programme"],
                homeFaculty: (item["Home Faculty"] === undefined) ? "" : item["Home Faculty"],
                reason: (item["Reason(s) for Special Arrangements"] === undefined) ? "" : item["Reason(s) for Special Arrangements"],
                extraTime: (item["Extra time %"] === undefined) ? "" : item["Extra time %"],
                breakLaps: (item["Break Laps"] === undefined) ? "" : item["Break Laps"],
                noBreaksIn2Hr: (item["No. of Breaks in 2 Hours exam"] === undefined) ? "" : item["No. of Breaks in 2 Hours exam"],
                noBreaksIn3Hr: (item["No. of Breaks in 3 Hours exam"] === undefined) ? "" : item["No. of Breaks in 3 Hours exam"],
                separateVenue: (item["Separate Venue (Yes / No)"] === undefined) ? "" : item["Separate Venue (Yes / No)"],
                permissionUseComputer: (item["Permission to use Computer (Yes / No)"] === undefined) ? "" : item["Permission to use Computer (Yes / No)"],
                otherSpecialArrangement: (item["Other Special Arrangements"] === undefined) ? "" : item["Other Special Arrangements"],
            }
            jsonObjects.push(jsonObj);
        }

        // console.log(jsonObjects)
        // await saveExamSen(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getexamInvigilatorCount(url, code))
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
                <h2>{displayName}</h2>
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
                            Clear All Invigilators for this faculty
                        </Button>
                    </> :
                    <>
                        <Button
                            onClick={() => document.getElementById('invi_' + code).click()}
                            loading={loading}>
                            Download template
                        </Button>
                        <label htmlFor={'invi_' + code}>
                            <Button
                                onClick={() => document.getElementById('invi_' + code).click()}
                                loading={loading}>
                                Upload Invigilators
                            </Button>
                        </label>
                        <input hidden type="file" id={'invi_' + code} onChange={handleFileAsync} />
                    </>
                }
            </td>
        </tr >
    );
}

export default Invigilators;
