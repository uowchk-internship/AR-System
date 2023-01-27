import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveExamBoardArgo, getExamBoardArgoCount, getFirst10RowOfItem, clearExamBoardArgo } from '../../../functions/source/ExamBoardArgo'

const ExamBoardArgo = (props) => {
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
        await clearExamBoardArgo(url)
        setLoaded(false)
        setLoading(false)
    }

    async function handleFileAsync(e) {
        setLoading(true)
        let jsonObjects = []

        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */
        let workbook_src = XLSX.read(data);

        for (let name of workbook_src.SheetNames) {
            let workbook = workbook_src.Sheets[name]
            // console.log(workbook);

            let fileJson = XLSX.utils.sheet_to_json(workbook);
            // console.log(fileJson);

            for (let item of fileJson) {
                let jsonObj = {
                    id: 0,
                    studId: (item["STUD_ID"] === undefined) ? "" : item["STUD_ID"],
                    year: (item["Year"] === undefined) ? "" : item["Year"],
                    attempCredit: (item["attemp_credit"] === undefined) ? "" : item["attemp_credit"],
                    cgpa: (item["cgpa"] === undefined) ? "" : item["cgpa"],
                    cohort: (item["cohort"] === undefined) ? "" : item["cohort"],
                    comment: (item["comment"] === undefined) ? "" : item["comment"],
                    earnedCredit: (item["earned_credit"] === undefined) ? "" : item["earned_credit"],
                    faculty: (item["faculty"] === undefined) ? "" : item["faculty"],
                    lastEnrolment: (item["last_enrolment"] === undefined) ? "" : item["last_enrolment"],
                    level: (item["level"] === undefined) ? "" : item["level"],
                    maxSeq: (item["max_seq"] === undefined) ? "" : item["max_seq"],
                    name: (item["name"] === undefined) ? "" : item["name"],
                    prog: (item["prog"] === undefined) ? "" : item["prog"],
                    progHist: (item["prog_hist"] === undefined) ? "" : item["prog_hist"],
                    studStatus: (item["stud_status"] === undefined) ? "" : item["stud_status"],
                    totGradePt: (item["tot_grade_pt"] === undefined) ? "" : item["tot_grade_pt"]
                }
                jsonObjects.push(jsonObj);
            }
        }
        await saveExamBoardArgo(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getExamBoardArgoCount(url))
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
                <h2>ExamBoardArgo</h2>
                <span style={{ fontSize: 14 }}>Exam Board Argo excel given by Tony</span>
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
                            Clear all ExamBoardArgo data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="ExamBoardArgoUpload">
                            <Button
                                onClick={() => document.getElementById('ExamBoardArgoUpload').click()}
                                loading={loading}>
                                Upload ExamBoardArgo
                            </Button>
                        </label>
                        <input hidden type="file" id="ExamBoardArgoUpload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    )
}

export default ExamBoardArgo;
