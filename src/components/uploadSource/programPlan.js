import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Card, Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveProgramPlan, getProgramPlanCount, getProgramPlanCountByYear, clearProgramPlan } from '../../functions/source/ProgramPlan'

const ProgramPlan = (props) => {
    let item = props.item
    let year = item.substring(0, 4)

    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [oldURL, setOldURL] = useState("")

    const clearData = async () => {
        setLoading(true)
        await clearProgramPlan(url)
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

            let objectKeys = Object.keys(item)
            // console.log(item)
            // console.log(objectKeys)

            for (let key of objectKeys) {

                if (!(key === "Course" || key === "UOC")) {
                    // console.log(key)
                    let tempObj = {
                        course: item["Course"],
                        credit: item["UOC"],
                        program: key,
                        type: item[key],
                        year: year
                    }

                    // console.log(tempObj)

                    jsonObjects.push(tempObj)
                }

            }

        }

        await saveProgramPlan(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getProgramPlanCountByYear(url, year))
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
                <h2>Program Plan - ({year})</h2>
            </td>

            <td>
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
            </td>
            <td>
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
                        <label htmlFor="programPlanUpload">
                            <Button
                                onClick={() => document.getElementById('programPlanUpload').click()}
                                loading={loading}>
                                Upload CSV
                            </Button>
                            <Button
                                onClick={() => window.open('/Program_Plan_Sample.xlsx', '_blank')}
                                loading={loading}>
                                Download Sample
                            </Button>
                        </label>
                        <input hidden type="file" id="programPlanUpload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    );
}

export default ProgramPlan;
