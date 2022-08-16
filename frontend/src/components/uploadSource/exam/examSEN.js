import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo10, getArgo10Count, getFirst10RowOfItem, clearArgo10 } from '../../../functions/source/Argo10'

const ExamSEN = (props) => {
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
        await clearArgo10(url)
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
                cohort: (item["MultiColumn1.Cohort"] === undefined) ? "" : item["MultiColumn1.Cohort"],
                internalId: (item["MultiColumn1.InternalId"] === undefined) ? "" : item["MultiColumn1.InternalId"],
                studentId: (item["MultiColumn1.StudentID"] === undefined) ? "" : item["MultiColumn1.StudentID"],
                lastName: (item["MultiColumn1.LastName"] === undefined) ? "" : item["MultiColumn1.LastName"],
                firstName: (item["MultiColumn1.FirstName"] === undefined) ? "" : item["MultiColumn1.FirstName"],
                enrolYearTerm: (item["MultiColumn1.EnrolYearTerm"] === undefined) ? "" : item["MultiColumn1.EnrolYearTerm"],
                progCode: (item["MultiColumn1.ProgCode"] === undefined) ? "" : item["MultiColumn1.ProgCode"],
                studStatus: (item["MultiColumn1.StudStatus"] === undefined) ? "" : item["MultiColumn1.StudStatus"],
                deptCode: (item["MultiColumn1.DeptCode"] === undefined) ? "" : item["MultiColumn1.DeptCode"],
                blockCode: (item["MultiColumn1.BlockCode"] === undefined) ? "" : item["MultiColumn1.BlockCode"],
                shrtcknTermCode: (item["MultiColumn1.SHRTCKN_TERM_CODE"] === undefined) ? "" : item["MultiColumn1.SHRTCKN_TERM_CODE"],
                shrtcknSubjCode: (item["MultiColumn1.SHRTCKN_SUBJ_CODE"] === undefined) ? "" : item["MultiColumn1.SHRTCKN_SUBJ_CODE"],
                shrtcknCrseNumb: (item["MultiColumn1.SHRTCKN_CRSE_NUMB"] === undefined) ? "" : item["MultiColumn1.SHRTCKN_CRSE_NUMB"],
                shrtcknCrseTitle: (item["MultiColumn1.shrtckn_crse_title"] === undefined) ? "" : item["MultiColumn1.shrtckn_crse_title"],
                shrtckgCreditHours: (item["MultiColumn1.SHRTCKG_CREDIT_HOURS"] === undefined || item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"] === undefined) ? "" :
                    ((item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "A") || (item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "B") ||
                        (item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "C") || (item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "D") ||
                        (item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "P")) ?
                        item["MultiColumn1.SHRTCKG_CREDIT_HOURS"] : 0,
                shrtckgHoursAttempted: (item["MultiColumn1.shrtckg_hours_attempted"] === undefined) ? "" : item["MultiColumn1.shrtckg_hours_attempted"],
                shrtckgGrdeCodeFinal: (item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"] === undefined) ? "" : item["MultiColumn1.SHRTCKG_GRDE_CODE_FINAL"],
                excludeSubject: (item["MultiColumn1.exclude_subject"] === undefined) ? "" : item["MultiColumn1.exclude_subject"],
                gradePoint: (item["MultiColumn1.grade_point"] === undefined) ? "" : item["MultiColumn1.grade_point"],
                countGpaInd: (item["MultiColumn1.count_gpa_ind"] === undefined) ? "" : item["MultiColumn1.count_gpa_ind"],
                instName: (item["MultiColumn1.inst_name"] === undefined) ? "" : item["MultiColumn1.inst_name"],
                attemptedInd: (item["MultiColumn1.attempted_ind"] === undefined) ? "" : item["MultiColumn1.attempted_ind"],
                passedInd: (item["MultiColumn1.passed_ind"] === undefined) ? "" : item["MultiColumn1.passed_ind"],
                completedInd: (item["MultiColumn1.completed_ind"] === undefined) ? "" : item["MultiColumn1.completed_ind"]
            }
            jsonObjects.push(jsonObj);
        }

        await saveArgo10(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo10Count(url))
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
                <h2>Exam SEN</h2>
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
                            Clear All Argo10 Data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="argo10Upload">
                            <Button
                                onClick={() => document.getElementById('argo10Upload').click()}
                                loading={loading}>
                                Upload argo10
                            </Button>
                        </label>
                        <input hidden type="file" id="argo10Upload" onChange={handleFileAsync} />
                    </>
                }
            </td>
        </tr >
    );
}

export default ExamSEN;
