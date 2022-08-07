import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveProgramPlan, getProgramPlanCountByYear, getFirst10RowOfItem, clearProgramPlan } from '../../functions/source/ProgramPlan'

const ProgramPlan = (props) => {
    let item = props.item
    let year = item.substring(0, 4)

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
        await clearProgramPlan(url, year)
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

        console.log("Year: " + year)
        let jsonObjects = []
        for (let item of fileJson) {

            let objectKeys = Object.keys(item)
            // console.log(item)
            // console.log(objectKeys)

            for (let key of objectKeys) {

                if (!(key === "Course" || key === "UOC")) {
                    console.log("key: "+key)
                    let tempObj = {
                        course: item["Course"],
                        credit: (item["Course"].charAt(0) === "_" ? item[key] : item["UOC"]),
                        program: key.toUpperCase(),
                        type: (item["Course"].charAt(0) === "_" ? item["Course"].substring(1, item["Course"].length - 9) : item[key]),
                        year: year
                    }


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
                                setDisplayData(await getFirst10RowOfItem(url, year))
                            }}>
                            View First 10 Rows
                        </Button>

                        <Button
                            color="red"
                            loading={loading}
                            onClick={() => clearData()}>
                            Clear all Program Plan data
                        </Button>
                    </> :
                    <>
                        <label htmlFor={`programPlanUpload_${year}`}>
                            <Button
                                onClick={() => document.getElementById(`programPlanUpload_${year}`).click()}
                                loading={loading}>
                                Upload Program Plan
                            </Button>
                        </label>
                        <a href="/Program_Plan_Sample.xlsx" download="Program_Plan_Sample.xlsx">
                            <Button>
                                Download Sample
                            </Button>
                        </a>


                        <input hidden type="file" id={`programPlanUpload_${year}`} onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    );
}

export default ProgramPlan;
