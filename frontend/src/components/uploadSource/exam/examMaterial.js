import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveExamMaterial, getExamMaterialCount, getFirst10RowOfItem, clearExamMaterial } from '../../../functions/source/ExamMaterial'

const ExamMaterial = (props) => {
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
        await clearExamMaterial(url)
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
            if (item["__rowNum__"] > 2) {

                let jsonObj = {
                    id: 0,
                    course: (item["__EMPTY"] === undefined) ? "" : item["__EMPTY"],
                    answerBooklet: (item["Copies of Printings"] === undefined) ? "" : item["Copies of Printings"],
                    suppSheets: (item["__EMPTY_1"] === undefined) ? "" : item["__EMPTY_1"],
                    mcAnswerSheet: (item["__EMPTY_2"] === undefined) ? "" : item["__EMPTY_2"],
                    graphPaper: (item["__EMPTY_3"] === undefined) ? "" : item["__EMPTY_3"],
                    a4BlankPaper: (item["__EMPTY_4"] === undefined) ? "" : item["__EMPTY_4"],
                    otherSpecifiedMaterials: (item["__EMPTY_5"] === undefined) ? "" : item["__EMPTY_5"],
                    openBookExam: (item["Permitted Aids"] === undefined) ? "" : item["Permitted Aids"],
                    approvedCalculators: (item["__EMPTY_6"] === undefined) ? "" : item["__EMPTY_6"],
                    approvedNotes: (item["__EMPTY_7"] === undefined) ? "" : item["__EMPTY_7"],
                    others: (item["__EMPTY_8"] === undefined) ? "" : item["__EMPTY_8"],
                }
                jsonObjects.push(jsonObj);

            }
        }
        // console.log(jsonObjects)
        await saveExamMaterial(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getExamMaterialCount(url))
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
                <h2>Exam Material</h2>
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
                            Clear All Exam Material Data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="examMaterialUpload">
                            <Button
                                onClick={() => document.getElementById('examMaterialUpload').click()}
                                loading={loading}>
                                Upload Exam Material
                            </Button>
                        </label>
                        <input hidden type="file" id="examMaterialUpload" onChange={handleFileAsync} />
                    </>
                }
            </td>
        </tr >
    );
}

export default ExamMaterial;
