import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Card, Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo16, getArgo16Count, getArgo16Items, clearArgo16 } from '../../functions/source/Argo16'

const Argo16 = () => {
    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

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
        }

        if (!loaded) {
            fetchNumber()
        }

    })


    return (
        <div style={{ width: 250, margin: 'auto', display: 'inline-block', padding: 10 }}>
            <Card shadow="xl" p="xl">
                <Card.Section><h3>Argo16</h3></Card.Section>

                <Card.Section>
                    <Badge size="lg" variant="outline">
                        {loaded ?
                            <>
                                {(entryCount > 0) ?
                                    `${entryCount} rows` : `Not yet upload`
                                }

                            </> :
                            <> Loading...</>
                        }
                    </Badge>
                </Card.Section>
                <br />
                {(entryCount > 0) ?
                    <>
                        <Button
                            color="red"
                            loading={loading}
                            onClick={() => clearData()}>
                            Clear all data
                        </Button>
                    </> :
                    <>
                        <label for="argo16Upload">
                            <Button
                                onClick={() => document.getElementById('argo16Upload').click()}
                                loading={loading}>
                                Upload CSV
                            </Button>
                        </label>
                        <input hidden type="file" id="argo16Upload" onChange={handleFileAsync} />

                    </>
                }

            </Card>

        </div>
    );
}

export default Argo16;
