import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo16, getArgo16Count, getFirst10RowOfItem, clearArgo16 } from '../../functions/source/Argo16'

const Argo16 = (props) => {
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
        await clearArgo16(url)
        setLoaded(false)
        setLoading(false)
    }

    async function handleFileAsync(e) {
        setLoading(true)

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.read(data).Sheets["Sheet1"];
        // console.log(workbook);

        let fileJson = XLSX.utils.sheet_to_json(workbook);
        // console.log(fileJson);

        let jsonObjects = []
        for (let item of fileJson) {
            let jsonObj = {
                id: 0,
                term: (item["MultiColumn1.Term"] === undefined) ? "" : item["MultiColumn1.Term"],
                pidm: (item["MultiColumn1.PIDM"] === undefined) ? "" : item["MultiColumn1.PIDM"],
                studId: (item["MultiColumn1.StudID"] === undefined) ? "" : item["MultiColumn1.StudID"],
                lastName: (item["MultiColumn1.LastName"] === undefined) ? "" : item["MultiColumn1.LastName"],
                firstName: (item["MultiColumn1.FirstName"] === undefined) ? "" : item["MultiColumn1.FirstName"],
                faculty: (item["MultiColumn1.Faculty"] === undefined) ? "" : item["MultiColumn1.Faculty"],
                programme: (item["MultiColumn1.Programme"] === undefined) ? "" : item["MultiColumn1.Programme"],
                level: (item["MultiColumn1.Level"] === undefined) ? "" : item["MultiColumn1.Level"],
                attempHr: (item["MultiColumn1.AttempHr"] === undefined) ? "" : item["MultiColumn1.AttempHr"],
                earnHr: (item["MultiColumn1.EarnHr"] === undefined) ? "" : item["MultiColumn1.EarnHr"],
                passHr: (item["MultiColumn1.PassHr"] === undefined) ? "" : item["MultiColumn1.PassHr"],
                gpaHr: (item["MultiColumn1.GPAHr"] === undefined) ? "" : item["MultiColumn1.GPAHr"],
                qualPts: (item["MultiColumn1.QualPts"] === undefined) ? "" : item["MultiColumn1.QualPts"],
                sgpa: (item["MultiColumn1.SGPA"] === undefined) ? "" : item["MultiColumn1.SGPA"],
                cgpa: (item["MultiColumn1.CGPA"] === undefined) ? "" : item["MultiColumn1.CGPA"],
                studStatus: (item["MultiColumn1.StudStatus"] === undefined) ? "" : item["MultiColumn1.StudStatus"],
            }
            jsonObjects.push(jsonObj);
        }

        await saveArgo16(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo16Count(url))
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
                <h2>Argo16</h2>
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
                {
                    (entryCount > 0) ?
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
                                Clear all argo16 data
                            </Button>
                        </> :
                        <>
                            <label htmlFor="argo16Upload">
                                <Button
                                    onClick={() => document.getElementById('argo16Upload').click()}
                                    loading={loading}>
                                    Upload argo16
                                </Button>
                            </label>
                            <input hidden type="file" id="argo16Upload" onChange={handleFileAsync} />
                        </>
                }
            </td>
        </tr >
    );
}

export default Argo16;
