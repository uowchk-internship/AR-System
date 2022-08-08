import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Button, Select, Table } from '@mantine/core';

import { updateHashmap, getCourseList } from '../../functions/report/attendanceList'
import { downloadSingleCSV } from '../../functions/report/moodleCSV'

export default function AttendanceList(props) {
    const { url } = useSelector((state) => state.setting);

    const [courseList, setCourseList] = useState([])

    //Options
    const departmentOptionList = [
        { value: 'ALL', label: 'All' },
        { value: 'BU', label: 'BU (Business)' },
        { value: 'AH', label: 'AH (Arts and Humanities)' },
        { value: 'ST', label: 'ST (Science and Technology)' },
        { value: 'SS', label: 'SS (Social Science)' },
    ]
    const [courseOptionList, setCourseOptionList] = useState([])

    //Selected values
    const [chosenDepartment, setChosenDepartment] = useState("ALL")
    const [chosenCourse, setChosenCourse] = useState("ALL")
    const [finalCourseList, setFinalCourseList] = useState([])

    //Old value
    const [oldDepartment, setOldDepartment] = useState("ALL")
    const [oldCourse, setOldCourse] = useState("ALL")

    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [tempResult, setTempResult] = useState({})
    const [loading, setLoading] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const filter = async (courseList_, chosenDepartment_, chosenCourse_) => {

        setTempResult({})

        if (courseList_.length === 0) {
            courseList_ = courseList
        }

        let courseOptions = [{ value: "ALL", label: "All" }]
        let chosenCourseList = []



        console.log(courseList_)

        for (let course of courseList_) {
            if (chosenDepartment_ === "ALL" || chosenDepartment_ === course.courseOfferDept) {
                courseOptions.push({ value: course.courseCode, label: `${course.courseCode} (${course.courseTitle})` })
                if (chosenCourse_ === "ALL") {
                    chosenCourseList.push(course.courseCode)
                }
            }
            if (chosenCourse_ !== "ALL" && chosenCourse_ === course.courseCode) {
                chosenCourseList.push(course.courseCode)
            }
        }


        setCourseOptionList(courseOptions)
        setFinalCourseList(chosenCourseList)
        setCount(chosenCourseList.length)

    }


    useEffect(() => {
        const loadData = async () => {
            let courseList = await getCourseList(url)

            setCourseList(courseList)
            filter(courseList, "ALL", "ALL")
            setLoaded(true)

            updateHashmap(url)
        }

        if (!loaded) {
            loadData()
        }

        if (chosenDepartment !== oldDepartment) {
            setOldDepartment(chosenDepartment)

            setChosenCourse("ALL")
            setOldCourse("ALL")

            filter([], chosenDepartment, "ALL")
        } else if (chosenCourse !== oldCourse) {
            setOldCourse(chosenCourse)

            filter([], chosenDepartment, chosenCourse)
        }


    })

    return (
        <>
            <h2 >Download Moodle CSV File </h2>

            <Table
                className="reportTable"
                striped highlightOnHover
                style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
                <tbody>
                    <tr>
                        <th>Department</th>
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
                </tbody>
            </Table>

            <h2>
                <span style={{ fontSize: 30 }}>{count} </span>
                Course Chosen
            </h2>


            <form
                method="post"
                onSubmit={() => {
                    setDownloading(true)
                    setInterval(() => {
                        setDownloading(false)
                    }, 3000);
                }}
                action={`${url}/api/report/moodleCSV/zip`} >
                <input type="hidden" name="course" value={finalCourseList}></input>
                <Button
                    type="submit"
                    disabled={tempResult.normalCount === 0}
                    loading={downloading}
                    name="" >
                    {(count === 1) ?
                        "Download Moodle CSV file" :
                        "Download Moodle CSV files in zip"}
                </Button>

                <p>For zip download, it may takes a few minutes to generate.</p>
            </form>
        </>
    )
}