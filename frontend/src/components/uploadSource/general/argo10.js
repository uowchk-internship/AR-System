import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo10, getArgo10Count, getFirst10RowOfItem, clearArgo10 } from '../../../functions/source/Argo10'

const Argo10 = (props) => {
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
        let workbook = XLSX.read(data);
        workbook = workbook.Sheets[workbook.SheetNames[0]]
        // console.log(workbook);

        let fileJson = XLSX.utils.sheet_to_json(workbook);
        // console.log(fileJson);

        let jsonObjects = []
        for (let item of fileJson) {
            let jsonObj = {
                id: 0,
                cohort: (item["Cohort"] === undefined) ? "" : item["Cohort"],
                internalId: (item["InternalId"] === undefined) ? "" : item["InternalId"],
                studentId: (item["StudentID"] === undefined) ? "" : item["StudentID"],
                lastName: (item["LastName"] === undefined) ? "" : item["LastName"],
                firstName: (item["FirstName"] === undefined) ? "" : item["FirstName"],
                enrolYearTerm: (item["EnrolYearTerm"] === undefined) ? "" : item["EnrolYearTerm"],
                progCode: (item["ProgCode"] === undefined) ? "" : item["ProgCode"],
                studStatus: (item["StudStatus"] === undefined) ? "" : item["StudStatus"],
                deptCode: (item["DeptCode"] === undefined) ? "" : item["DeptCode"],
                blockCode: (item["BlockCode"] === undefined) ? "" : item["BlockCode"],
                shrtcknTermCode: (item["SHRTCKN_TERM_CODE"] === undefined) ? "" : item["SHRTCKN_TERM_CODE"],
                shrtcknSubjCode: (item["SHRTCKN_SUBJ_CODE"] === undefined) ? "" : item["SHRTCKN_SUBJ_CODE"],
                shrtcknCrseNumb: (item["SHRTCKN_CRSE_NUMB"] === undefined) ? "" : item["SHRTCKN_CRSE_NUMB"],
                shrtcknCrseTitle: (item["shrtckn_crse_title"] === undefined) ? "" : item["shrtckn_crse_title"],
                shrtckgCreditHours: (item["SHRTCKG_CREDIT_HOURS"] === undefined || item["SHRTCKG_GRDE_CODE_FINAL"] === undefined) ? "" :
                    ((item["SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "A") || (item["SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "B") ||
                        (item["SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "C") || (item["SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "D") ||
                        (item["SHRTCKG_GRDE_CODE_FINAL"].charAt(0) === "P")) ?
                        item["SHRTCKG_CREDIT_HOURS"] : 0,
                shrtckgHoursAttempted: (item["shrtckg_hours_attempted"] === undefined) ? "" : item["shrtckg_hours_attempted"],
                shrtckgGrdeCodeFinal: (item["SHRTCKG_GRDE_CODE_FINAL"] === undefined) ? "" : item["SHRTCKG_GRDE_CODE_FINAL"],
                excludeSubject: (item["exclude_subject"] === undefined) ? "" : item["exclude_subject"],
                gradePoint: (item["grade_point"] === undefined) ? "" : item["grade_point"],
                countGpaInd: (item["count_gpa_ind"] === undefined) ? "" : item["count_gpa_ind"],
                instName: (item["inst_name"] === undefined) ? "" : item["inst_name"],
                attemptedInd: (item["attempted_ind"] === undefined) ? "" : item["attempted_ind"],
                passedInd: (item["passed_ind"] === undefined) ? "" : item["passed_ind"],
                completedInd: (item["completed_ind"] === undefined) ? "" : item["completed_ind"]
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
                <h2>Argo10</h2>
                Student Grades Records by Faculty by Program
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

export default Argo10;
