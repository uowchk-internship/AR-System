import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo29, getArgo29Count, getFirst10RowOfItem, clearArgo29 } from '../../../functions/source/Argo29'

const Argo29 = (props) => {
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
        await clearArgo29(url)
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
                spridenId: (item["SPRIDEN_ID"] === undefined) ? "" : item["SPRIDEN_ID"],
                shrttrmPidm: (item["SHRTTRM_PIDM"] === undefined) ? "" : item["SHRTTRM_PIDM"],
                shrttrmTermCode: (item["SHRTTRM_TERM_CODE"] === undefined) ? "" : item["SHRTTRM_TERM_CODE"],
                stvastdDesc: (item["STVASTD_DESC"] === undefined) ? "" : item["STVASTD_DESC"]
            }
            jsonObjects.push(jsonObj);
        }

        await saveArgo29(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo29Count(url))
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
                <h2>Argo29</h2>
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
                            Clear all argo29 data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="argo29Upload">
                            <Button
                                onClick={() => document.getElementById('argo29Upload').click()}
                                loading={loading}>
                                Upload argo29
                            </Button>
                        </label>
                        <input hidden type="file" id="argo29Upload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    )
}

export default Argo29;
