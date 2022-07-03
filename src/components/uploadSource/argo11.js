import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Card, Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo11, getArgo11Count, getArgo11Items, clearArgo11 } from '../../functions/source/Argo11'

const Argo11 = () => {
    //Redux
    const { url } = useSelector((state) => state.setting);

    const [entryCount, setEntryCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

    const clearData = async () => {
        setLoading(true)
        await clearArgo11(url)
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
                internalId: (item["MultiColumn1.InternalId"] === undefined) ? "" : item["MultiColumn1.InternalId"],
                studentId: (item["MultiColumn1.StudentID"] === undefined) ? "" : item["MultiColumn1.StudentID"],
                lastName: (item["MultiColumn1.LastName"] === undefined) ? "" : item["MultiColumn1.LastName"],
                firstName: (item["MultiColumn1.FirstName"] === undefined) ? "" : item["MultiColumn1.FirstName"],
                middleName: (item["MultiColumn1.MiddleName"] === undefined) ? "" : item["MultiColumn1.MiddleName"],
                chineseName: (item["MultiColumn1.ChineseName"] === undefined) ? "" : item["MultiColumn1.ChineseName"],
                hkid: (item["MultiColumn1.HKID"] === undefined) ? "" : item["MultiColumn1.HKID"],
                studentPayNo: (item["MultiColumn1.StudentPayNo"] === undefined) ? "" : item["MultiColumn1.StudentPayNo"],
                gender: (item["MultiColumn1.Gender"] === undefined) ? "" : item["MultiColumn1.Gender"],
                enrolYearTerm: (item["MultiColumn1.EnrolYearTerm"] === undefined) ? "" : item["MultiColumn1.EnrolYearTerm"],
                progCode: (item["MultiColumn1.ProgCode"] === undefined) ? "" : item["MultiColumn1.ProgCode"],
                studStatus: (item["MultiColumn1.StudStatus"] === undefined) ? "" : item["MultiColumn1.StudStatus"],
                deptCode: (item["MultiColumn1.DeptCode"] === undefined) ? "" : item["MultiColumn1.DeptCode"],
                blockCode: (item["MultiColumn1.BlockCode"] === undefined) ? "" : item["MultiColumn1.BlockCode"],
                programmeTitle: (item["MultiColumn1.ProgrammeTitle"] === undefined) ? "" : item["MultiColumn1.ProgrammeTitle"],
                campus: (item["MultiColumn1.Campus"] === undefined) ? "" : item["MultiColumn1.Campus"],
                campusEmail: (item["MultiColumn1.CampusEmail"] === undefined) ? "" : item["MultiColumn1.CampusEmail"],
                personalEmail: (item["MultiColumn1.PersonalEmail"] === undefined) ? "" : item["MultiColumn1.PersonalEmail"],
                address: (item["MultiColumn1.Address"] === undefined) ? "" : item["MultiColumn1.Address"],
                mobile: (item["MultiColumn1.Mobile"] === undefined) ? "" : item["MultiColumn1.Mobile"],
                permPhone: (item["MultiColumn1.PermPhone"] === undefined) ? "" : item["MultiColumn1.PermPhone"],
                cohort: (item["MultiColumn1.Cohort"] === undefined) ? "" : item["MultiColumn1.Cohort"],
                curEnrolStatusCode: (item["MultiColumn1.CurEnrolStatusCode"] === undefined) ? "" : item["MultiColumn1.CurEnrolStatusCode"],
                currentEnrolStatus: (item["MultiColumn1.CurrentEnrolStatus"] === undefined) ? "" : item["MultiColumn1.CurrentEnrolStatus"],
                lastEnrolTerm: (item["MultiColumn1.last_enrol_term"] === undefined) ? "" : item["MultiColumn1.last_enrol_term"],
                lastEnrolTermStatus: (item["MultiColumn1.last_enrol_term_status"] === undefined) ? "" : item["MultiColumn1.last_enrol_term_status"],
                acadStatusCode: (item["MultiColumn1.AcadStatusCode"] === undefined) ? "" : item["MultiColumn1.AcadStatusCode"],
                acadStatusDesc: (item["MultiColumn1.AcadStatusDesc"] === undefined) ? "" : item["MultiColumn1.AcadStatusDesc"],
                awardClass: (item["MultiColumn1.award_class"] === undefined) ? "" : item["MultiColumn1.award_class"],
                rateCode: (item["MultiColumn1.RateCode"] === undefined) ? "" : item["MultiColumn1.RateCode"],
                level: (item["MultiColumn1.Level"] === undefined) ? "" : item["MultiColumn1.Level"],
                gradTerm: (item["MultiColumn1.GradTerm"] === undefined) ? "" : item["MultiColumn1.GradTerm"],
                passport: (item["MultiColumn1.PASSPORT"] === undefined) ? "" : item["MultiColumn1.PASSPORT"],
                mrid: (item["MultiColumn1.MRID"] === undefined) ? "" : item["MultiColumn1.MRID"],
                studentComment: (item["MultiColumn1.StudentComment"] === undefined) ? "" : item["MultiColumn1.StudentComment"]
            }
            jsonObjects.push(jsonObj);
        }

        // console.log(JSON.stringify(jsonObjects));

        await saveArgo11(url, jsonObjects)
        setLoaded(false)
        setLoading(false)
    }

    useEffect(() => {
        const fetchNumber = async () => {
            setEntryCount(await getArgo11Count(url))
            setLoaded(true)
        }

        if (!loaded) {
            fetchNumber()
        }

    })


    return (
        <div style={{ width: 250, margin: 'auto', display: 'inline-block', padding: 10 }}>
            <Card shadow="xl" p="xl">
                <Card.Section><h3>Argo11</h3></Card.Section>

                <Card.Section>
                    <Badge size="lg" variant="outline" >
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
                        <label for="argo11Upload">
                            <Button
                                onClick={() => document.getElementById('argo11Upload').click()}
                                loading={loading}>
                                Upload CSV
                            </Button>
                        </label>
                        <input hidden type="file" id="argo11Upload" onChange={handleFileAsync} />

                    </>
                }

            </Card>

        </div>
    );
}

export default Argo11;
