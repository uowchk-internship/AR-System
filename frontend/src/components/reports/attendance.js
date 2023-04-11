import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Button, Select, Table } from '@mantine/core';

import { updateHashmap, getCourseList } from '../../functions/report/attendanceList'

import { getArgo12Count } from '../../functions/source/Argo12'
import { getArgo5Count } from '../../functions/source/Argo5'

export default function AttendanceList(props) {
    const { url } = useSelector((state) => state.setting);

    let username_ = props.username
    let username = "admin"
    const [courseList, setCourseList] = useState([])

    const [argo12Count, setArgo12Count] = useState(-1)
    const [argo5Count, setArgo5Count] = useState(-1)

    //Options
    const departmentOptionList = [
        { value: 'ALL', label: 'All', disabled: (username !== "admin") },
        { value: 'BU', label: 'BU (Business)', disabled: (username !== "admin" && username !== "bu") },
        { value: 'AH', label: 'AH (Arts and Humanities)', disabled: (username !== "admin" && username !== "ah") },
        { value: 'ST', label: 'ST (Science and Technology)', disabled: (username !== "admin" && username !== "st") },
        { value: 'SS', label: 'SS (Social Science)', disabled: (username !== "admin" && username !== "ss") },
    ]
    const [courseOptionList, setCourseOptionList] = useState([])
    const [sectionOptionList, setSectionOptionList] = useState([])

    //Selected values
    const [chosenDepartment, setChosenDepartment] = useState((username === "admin") ? "ALL" : username.toUpperCase())
    const [chosenCourse, setChosenCourse] = useState("ALL")
    const [chosenSection, setChosenSection] = useState("ALL")
    const [crnList, setCrnList] = useState([])

    //Old value
    const [oldDepartment, setOldDepartment] = useState("ALL")
    const [oldCourse, setOldCourse] = useState("ALL")
    const [oldSection, setOldSection] = useState("ALL")

    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [tempResult, setTempResult] = useState({})
    const [downloading, setDownloading] = useState(false)

    const filter = async (courseList_, chosenDepartment_, chosenCourse_, chosenSection_) => {

        setTempResult({})

        if (courseList_.length === 0) {
            courseList_ = courseList
        }

        let courseOptions = [{ value: "ALL", label: "All" }]
        let sectionOptions = [{ value: "ALL", label: "All" }]
        let chosenCrnList = []



        // console.log(courseList_)
        if (chosenSection_ !== "ALL") {
            chosenCrnList = [chosenSection_]
        } else {



            for (let course of courseList_) {
                if (chosenDepartment_ === "ALL" || chosenDepartment_ === course.courseOfferDept) {
                    courseOptions.push({ value: course.courseCode, label: `${course.courseCode} (${course.courseTitle})` })
                    if (chosenCourse_ === "ALL") {
                        for (let crn of course.sectionCrnList) {
                            let crnCode = crn.substring(crn.length - 6, crn.length - 1)
                            chosenCrnList.push(crnCode)
                            sectionOptions.push({ value: crnCode, label: crn })
                        }
                    }
                }
                if (chosenCourse_ !== "ALL" && chosenCourse_ === course.courseCode) {
                    for (let crn of course.sectionCrnList) {
                        let crnCode = crn.substring(crn.length - 6, crn.length - 1)
                        sectionOptions.push({
                            value: crnCode,
                            label: crn
                        })
                        if (chosenSection_ === "ALL") {
                            chosenCrnList.push(crnCode)
                        }
                        // console.log(crnCode)
                        if (chosenSection_ !== "ALL" && chosenSection_ === crnCode) {
                            // console.log(chosenSection_ === crnCode)
                            chosenCrnList.push(crnCode)
                        }
                    }
                }
            }
        }


        setCourseOptionList(courseOptions)
        setSectionOptionList(sectionOptions)
        setCrnList(chosenCrnList)
        setCount(chosenCrnList.length)

    }


    useEffect(() => {
        const loadData = async () => {
            let courseList = await getCourseList(url)

            setCourseList(courseList)
            filter(courseList, (username === "admin") ? "ALL" : username.toUpperCase(), "ALL", "ALL")
            setLoaded(true)

            updateHashmap(url)

            setArgo12Count(await getArgo12Count(url));
            setArgo5Count(await getArgo5Count(url));
        }

        if (!loaded) {
            loadData()
        }

        if (chosenDepartment !== oldDepartment) {
            setOldDepartment(chosenDepartment)

            setChosenCourse("ALL")
            setOldCourse("ALL")

            setChosenSection("ALL")
            setOldSection("ALL")

            filter([], chosenDepartment, "ALL", "ALL")
        } else if (chosenCourse !== oldCourse) {
            setOldCourse(chosenCourse)

            setChosenSection("ALL")
            setOldSection("ALL")

            filter([], chosenDepartment, chosenCourse, "ALL")
        } else if (chosenSection !== oldSection) {
            setOldSection(chosenSection)
            filter([], chosenDepartment, chosenCourse, chosenSection)
        }


    })

    if (argo12Count > 0 && argo5Count > 0) {
        return (
            <>
                <h2 >Download Attendance List </h2>

                <Table
                    className="reportTable"
                    striped highlightOnHover
                    style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
                    <tbody>
                        <tr>
                            <th>Faculty</th>
                            <td>
                                <Select
                                    data={departmentOptionList}
                                    onChange={setChosenDepartment}
                                    value={chosenDepartment} />
                            </td>
                        </tr>
                        <tr>
                            <th>Course</th>
                            <td>
                                <Select
                                    searchable
                                    data={courseOptionList}
                                    onChange={setChosenCourse}
                                    value={chosenCourse} />
                            </td>
                        </tr>
                        <tr>
                            <th>Session</th>
                            <td>
                                <Select
                                    searchable
                                    data={sectionOptionList}
                                    onChange={setChosenSection}
                                    value={chosenSection} />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <h2>
                    <span style={{ fontSize: 30 }}>{count} </span>
                    Session Chosen
                </h2>


                <form
                    method="post"
                    onSubmit={() => {
                        setDownloading(true)
                        setInterval(() => {
                            setDownloading(false)
                        }, 3000);
                    }}
                    action={`${url}/api/report/attendanceList/zip`} >
                    <input type="hidden" name="crn" value={crnList}></input>
                    <Button
                        type="submit"
                        disabled={tempResult.normalCount === 0}
                        loading={downloading}
                        name="" >
                        {(count === 1) ?
                            "Download Attendance List" :
                            "Download Attendance Lists in zip"}
                    </Button>
                </form>


            </>
        )

    } else {
        return (
            (argo12Count === -1 && argo5Count === -1) ?
                <>
                    <h1>Loading...</h1>
                </>
                : <>
                    <h1>Error: The required data source is not imported.</h1>
                    <h2>Data source required: Argo5, Argo12</h2>
                </>
        )
    }
}