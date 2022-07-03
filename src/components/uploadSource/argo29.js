import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Card, Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo29, getArgo29Count, getArgo29Items, clearArgo29 } from '../../functions/Argo29'

const Argo29 = () => {
    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

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
                shrtckgCreditHours: (item["MultiColumn1.SHRTCKG_CREDIT_HOURS"] === undefined) ? "" : item["MultiColumn1.SHRTCKG_CREDIT_HOURS"],
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

        await saveArgo29(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo29Count(url))
            setLoaded(true)
        }

        if (!loaded) {
            fetchNumber()
        }

    })


    return (
        <div style={{ width: 250, margin: 'auto', display: 'inline-block', padding:10 }}>
            <Card shadow="xl" p="xl">
                <Card.Section><h3>Argo29</h3></Card.Section>

                <Card.Section>
                    <Badge size="lg" variant="outline">
                        {loaded ?
                            <>
                                {entryCount} stored
                            </> :
                            <> Loading...</>
                        }
                    </Badge>
                </Card.Section>
                <br />
                {(entryCount > 0) ?
                    <>
                        <Button
                            loading={loading}
                            onClick={() => clearData()}>
                            Clear all data
                        </Button>
                    </> :
                    <>
                        <label for="argo29Upload">
                            <Button
                                onClick={() => document.getElementById('argo29Upload').click()}
                                loading={loading}>
                                Upload CSV
                            </Button>
                        </label>
                        <input hidden type="file" id="argo29Upload" onChange={handleFileAsync} />

                    </>
                }

            </Card>

        </div>
    );
}

export default Argo29;
