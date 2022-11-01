import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveExamInvigilator, getExamInvigilatorCount, getExamInvigilatorItems, getFirst10RowOfItem, clearExamInvigilator } from '../../../functions/source/Invigilators'

const Invigilators = (props) => {
    let setShowData = props.setShowData
    let setDisplayData = props.setDisplayData

    let displayName = props.displayName
    let code = props.code

    let changed = props.changed
    let setChanged = props.setChanged

    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [oldURL, setOldURL] = useState("")
    const [lastChangedState, setLastChangedState] = useState(false)


    const clearData = async () => {
        setLoading(true)
        await clearExamInvigilator(url, code)
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
                course: (item["Course"] === undefined) ? "" : item["Course"],
                faculty: (item["Faculty"] === undefined) ? "" : item["Faculty"],
                venue: (item["Venue"] === undefined) ? "" : item["Venue"],
                dateTime: (item["Date And Time"] === undefined) ? "" : item["Date And Time"],
                c1: (item["c1"] === undefined) ? "" : item["c1"],
                i1: (item["i1"] === undefined) ? "" : item["i1"],
                i2: (item["i2"] === undefined) ? "" : item["i2"]
            }
            jsonObjects.push(jsonObj);
        }

        console.log(jsonObjects)
        await saveExamInvigilator(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
        setChanged(!changed)
    }

    useEffect(() => {
        console.log("changed, " + changed)
        const fetchNumber = async () => {
            setEntryCount(await getExamInvigilatorCount(url, code))
            setLoaded(true)
            setOldURL(url)
        }

        if (!loaded) {
            fetchNumber()
        }
        if (url !== oldURL) {
            fetchNumber()
        }

        if (lastChangedState != changed) {
            setLastChangedState(changed)
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
                            onClick={async () => {
                                await clearData()
                                await new Promise(resolve => setTimeout(resolve, 500))
                                setChanged(!changed)
                            }}>
                            Clear All Invigilators for this faculty
                        </Button>
                    </> :
                    <>
                        <form
                            method="get"
                            action={`${url}/api/report/exam/inviTemplate/${code}`}
                        >
                            <Button
                                type="submit"
                            >
                                Download Template
                            </Button>


                            <label htmlFor={'invi_' + code}>
                                <Button
                                    onClick={() => document.getElementById('invi_' + code).click()}
                                    loading={loading}>
                                    Upload Invigilators
                                </Button>
                            </label>
                            <input hidden type="file" id={'invi_' + code} onChange={handleFileAsync} />
                        </form>
                    </>
                }
            </td>
        </tr >
    );
}

export default Invigilators;
