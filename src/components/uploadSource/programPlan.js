import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Card, Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveProgramPlan, getProgramPlanCount, getProgramPlanItems, clearProgramPlan } from '../../functions/source/ProgramPlan'

const ProgramPlan = () => {
    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

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

            if (item["__rowNum__"] >= 15 ){
                // console.log(item)
                let objectKeys =  Object.keys(item)

                for (let key of objectKeys) {
                    
                    if (!(key === "Course" || key === "Prog")){
                        // console.log(key)
                        let tempObj = {
                            course: item["Course"],
                            credit: item["Prog"],
                            program: key,
                            type: item[key]
                        }

                        // console.log(tempObj)

                        jsonObjects.push(tempObj)
                    }
                }


            }
            
        }

        await saveProgramPlan(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getProgramPlanCount(url))
            setLoaded(true)
        }

        if (!loaded) {
            fetchNumber()
        }

    })


    return (
        <div style={{ width: 250, margin: 'auto', display: 'inline-block', padding: 10 }}>
            <Card shadow="xl" p="xl">
                <Card.Section><h3>Program Plan</h3></Card.Section>

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
                        <label for="programPlanUpload">
                            <Button
                                onClick={() => document.getElementById('programPlanUpload').click()}
                                loading={loading}>
                                Upload CSV
                            </Button>
                        </label>
                        <input hidden type="file" id="programPlanUpload" onChange={handleFileAsync} />

                    </>
                }

            </Card>

        </div>
    );
}

export default ProgramPlan;
