import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Badge, Button } from '@mantine/core';
import * as XLSX from 'xlsx';

import { saveArgo11, getArgo11Count, getFirst10RowOfItem, clearArgo11 } from '../../../functions/source/Argo11'

const Argo11 = (props) => {
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
        await clearArgo11(url)
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
                internalId: (item["InternalId"] === undefined) ? "" : item["InternalId"],
                studentId: (item["StudentID"] === undefined) ? "" : item["StudentID"],
                lastName: (item["LastName"] === undefined) ? "" : item["LastName"],
                firstName: (item["FirstName"] === undefined) ? "" : item["FirstName"],
                middleName: (item["MiddleName"] === undefined) ? "" : item["MiddleName"],
                chineseName: (item["ChineseName"] === undefined) ? "" : item["ChineseName"],
                hkid: (item["HKID"] === undefined) ? "" : item["HKID"],
                studentPayNo: (item["StudentPayNo"] === undefined) ? "" : item["StudentPayNo"],
                gender: (item["Gender"] === undefined) ? "" : item["Gender"],
                enrolYearTerm: (item["EnrolYearTerm"] === undefined) ? "" : item["EnrolYearTerm"],
                progCode: (item["ProgCode"] === undefined) ? "" : item["ProgCode"],
                studStatus: (item["StudStatus"] === undefined) ? "" : item["StudStatus"],
                deptCode: (item["DeptCode"] === undefined) ? "" : item["DeptCode"],
                blockCode: (item["BlockCode"] === undefined) ? "" : item["BlockCode"],
                programmeTitle: (item["ProgrammeTitle"] === undefined) ? "" : item["ProgrammeTitle"],
                campus: (item["Campus"] === undefined) ? "" : item["Campus"],
                campusEmail: (item["CampusEmail"] === undefined) ? "" : item["CampusEmail"],
                personalEmail: (item["PersonalEmail"] === undefined) ? "" : item["PersonalEmail"],
                address: (item["Address"] === undefined) ? "" : item["Address"],
                mobile: (item["Mobile"] === undefined) ? "" : item["Mobile"],
                permPhone: (item["PermPhone"] === undefined) ? "" : item["PermPhone"],
                cohort: (item["Cohort"] === undefined) ? "" : item["Cohort"],
                curEnrolStatusCode: (item["CurEnrolStatusCode"] === undefined) ? "" : item["CurEnrolStatusCode"],
                currentEnrolStatus: (item["CurrentEnrolStatus"] === undefined) ? "" : item["CurrentEnrolStatus"],
                lastEnrolTerm: (item["last_enrol_term"] === undefined) ? "" : item["last_enrol_term"],
                lastEnrolTermStatus: (item["last_enrol_term_status"] === undefined) ? "" : item["last_enrol_term_status"],
                acadStatusCode: (item["AcadStatusCode"] === undefined) ? "" : item["AcadStatusCode"],
                acadStatusDesc: (item["AcadStatusDesc"] === undefined) ? "" : item["AcadStatusDesc"],
                awardClass: (item["award_class"] === undefined) ? "" : item["award_class"],
                rateCode: (item["RateCode"] === undefined) ? "" : item["RateCode"],
                level: (item["Level"] === undefined) ? "" : item["Level"],
                gradTerm: (item["GradTerm"] === undefined) ? "" : item["GradTerm"],
                passport: (item["PASSPORT"] === undefined) ? "" : item["PASSPORT"],
                mrid: (item["MRID"] === undefined) ? "" : item["MRID"],
                studentComment: (item["StudentComment"] === undefined) ? "" : item["StudentComment"]
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
                <h2>Argo11</h2>
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
                            Clear all argo11 data
                        </Button>
                    </> :
                    <>
                        <label htmlFor="argo11Upload">
                            <Button
                                onClick={() => document.getElementById('argo11Upload').click()}
                                loading={loading}>
                                Upload argo11
                            </Button>
                        </label>
                        <input hidden type="file" id="argo11Upload" onChange={handleFileAsync} />

                    </>
                }
            </td>
        </tr >
    );
}

export default Argo11;
