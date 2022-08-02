import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveCge, getCgeCount, clearCge } from '../../functions/source/Cge'

const Cge = () => {
    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [oldURL, setOldURL] = useState("")

    const clearData = async () => {
        setLoading(true)
        await clearCge(url)
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

            console.log(item);

            let tempObj = {
                id: 0,
                code: (item["Code"] === undefined) ? "" : item["Code"],
                title: (item["Title"] === undefined) ? "" : item["Title"],
                domain: (item["Domain"] === undefined) ? "" : item["Domain"],
                lvl: (item["Lvl"] === undefined) ? "" : item["Lvl"],
            }

            jsonObjects.push(tempObj);


        }

        await saveCge(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getCgeCount(url))
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
                <h2>CGE</h2>
            </td>

            <td>
                <Badge size="lg" variant="outline" color={(entryCount > 0) ? "":"gray"}>
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
                            Clear all CGE data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="cgeUpload">
                            <Button
                                onClick={() => document.getElementById('cgeUpload').click()}
                                loading={loading}>
                                Upload CGE
                            </Button>
                        </label>
                        <a href="/CGE_Sample.csv" download="CGE_Sample.csv">
                            <Button>
                                Download Sample
                            </Button>
                        </a>
                        <input hidden type="file" id="cgeUpload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >

    );
}

export default Cge;
