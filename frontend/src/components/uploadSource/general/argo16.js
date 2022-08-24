import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo16, getArgo16Count, getFirst10RowOfItem, clearArgo16 } from '../../../functions/source/Argo16'

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
        let workbook = XLSX.read(data);
        workbook = workbook.Sheets[workbook.SheetNames[0]]
        // console.log(workbook);

        let fileJson = XLSX.utils.sheet_to_json(workbook);
        // console.log(fileJson);

        let jsonObjects = []
        for (let item of fileJson) {
            let jsonObj = {
                id: 0,
                term: (item["Term"] === undefined) ? "" : item["Term"],
                pidm: (item["PIDM"] === undefined) ? "" : item["PIDM"],
                studId: (item["StudID"] === undefined) ? "" : item["StudID"],
                lastName: (item["LastName"] === undefined) ? "" : item["LastName"],
                firstName: (item["FirstName"] === undefined) ? "" : item["FirstName"],
                faculty: (item["Faculty"] === undefined) ? "" : item["Faculty"],
                programme: (item["Programme"] === undefined) ? "" : item["Programme"],
                level: (item["Level"] === undefined) ? "" : item["Level"],
                attempHr: (item["AttempHr"] === undefined) ? "" : item["AttempHr"],
                earnHr: (item["EarnHr"] === undefined) ? "" : item["EarnHr"],
                passHr: (item["PassHr"] === undefined) ? "" : item["PassHr"],
                gpaHr: (item["GPAHr"] === undefined) ? "" : item["GPAHr"],
                qualPts: (item["QualPts"] === undefined) ? "" : item["QualPts"],
                sgpa: (item["SGPA"] === undefined) ? "" : item["SGPA"],
                cgpa: (item["CGPA"] === undefined) ? "" : item["CGPA"],
                studStatus: (item["StudStatus"] === undefined) ? "" : item["StudStatus"],
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
