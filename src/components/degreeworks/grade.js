import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Button, Select, Table, Modal } from '@mantine/core';

import { getArgo11Items, getProgramList } from '../../functions/source/Argo11'
import { getTempExecuteResult, generateWithId, updateHashmap } from '../../functions/report/degreeworks'

const Grade = () => {
    const { url } = useSelector((state) => state.setting);

    const [studentList, setStudentList] = useState([])

    //Options
    const departmentOptionList = [
        { value: 'ALL', label: 'All' },
        { value: 'BU', label: 'BU (Business)' },
        { value: 'AH', label: 'AH (Arts and Humanities)' },
        { value: 'ST', label: 'ST (Science and Technology)' },
        { value: 'SS', label: 'SS (Social Science)' },
    ]
    const [programOptionList, setProgramOptionList] = useState([])
    const [studentIdOptionList, setStudentIdOptionList] = useState([])

    //Selected values
    const [chosenDepartment, setChosenDepartment] = useState("ALL")
    const [chosenProgram, setChosenProgram] = useState("ALL")
    const [chosenStudent, setChosenStudent] = useState("ALL")
    const [chosenStudentList, setChosenStudentList] = useState([])

    //Old value
    const [oldDepartment, setOldDepartment] = useState("ALL")
    const [oldProgram, setOldProgram] = useState("ALL")
    const [oldStudent, setOldStudent] = useState("ALL")

    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [tempResult, setTempResult] = useState({})
    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [chosenError, setChosenError] = useState("argo11")

    const filter = async (studentList_, chosenDepartment_, chosenProgram_, chosenStudent_) => {
        if (studentList_.length === 0) {
            studentList_ = studentList
        }

        let programOptions = [{ value: "ALL", label: "All" }]
        let studentOptions = [{ value: "ALL", label: "All" }]
        let tempStudentList = []

        let programList = await getProgramList(url, chosenDepartment_);


        for (let program of programList) {
            programOptions.push({ value: program, label: program })
        }

        for (let student of studentList_) {
            //Student List
            let nameAfterConcat = `${student.progCode} (${student.programmeTitle})`
            if ((nameAfterConcat === chosenProgram_) ||
                (chosenProgram_ === "ALL" && programList.includes(nameAfterConcat))) {
                studentOptions.push(
                    {
                        value: student.studentId,
                        label: `${student.studentId} (${student.lastName} ${student.firstName})`
                    }
                )
                tempStudentList.push(student.studentId)
            }
        }

        setProgramOptionList(programOptions)
        setStudentIdOptionList(studentOptions)
        if (chosenStudent_ !== "ALL") {
            setCount(1)
            setChosenStudentList([chosenStudent_])
        } else {
            setCount(studentOptions.length - 1)
            setChosenStudentList(tempStudentList)
        }

    }

    const retrieveTempResult = async () => {
        setLoading(true)
        setTempResult({})

        let result = await getTempExecuteResult(url, chosenStudentList);

        console.log(result)
        setTempResult(result)
        setLoading(false)
    }

    useEffect(() => {
        const loadData = async () => {
            let completeStudentList = await getArgo11Items(url)

            setStudentList(completeStudentList)
            filter(completeStudentList, "ALL", "ALL", "ALL")
            setLoaded(true)

            updateHashmap(url)
        }

        if (!loaded) {
            loadData()
        }

        if (chosenDepartment !== oldDepartment) {
            setOldDepartment(chosenDepartment)

            setChosenProgram("ALL")
            setOldProgram("ALL")

            setChosenStudent("ALL")
            setOldStudent("ALL")

            filter([], chosenDepartment, "ALL", "ALL")
        } else if (chosenProgram !== oldProgram) {
            setOldProgram(chosenProgram)

            setChosenStudent("ALL")
            setOldStudent("ALL")

            filter([], chosenDepartment, chosenProgram, "ALL")
        } else if (chosenStudent !== oldStudent) {
            setOldStudent(chosenStudent)
            filter([], chosenDepartment, chosenProgram, chosenStudent)
        }


    })


    return (
        <>
            <h2 style={{ paddingTop: 100 }}>Download reports </h2>

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
                        <th>Program</th>
                        <td>
                            <Select
                                searchable
                                data={programOptionList}
                                onChange={setChosenProgram}
                                value={chosenProgram} />
                        </td>
                    </tr>
                    <tr>
                        <th>Students</th>
                        <td>
                            <Select
                                searchable
                                data={studentIdOptionList}
                                onChange={setChosenStudent}
                                value={chosenStudent} />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <h2>
                <span style={{ fontSize: 30 }}>{count} </span>
                Students Chosen
            </h2>

            <Button
                loading={loading}
                onClick={async () => {
                    await retrieveTempResult()
                }}>
                Generate report
            </Button>

            <br /><br /><br /><br /><br />
            <hr />

            {(Object.keys(tempResult).length > 0) ?
                <>
                    <h2>Result</h2>

                    <Table
                        striped highlightOnHover
                        style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ color: "green" }}><b>Students generated</b></td>
                                <td>{tempResult.normalCount}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ color: "red" }}><b>Students have no record in Argo10</b></td>
                                <td>{tempResult.noArgo10RecordCount}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            setShowModal(true)
                                            setChosenError("Students have no record in Argo10")
                                        }}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ color: "red" }}><b>No Program Plan for students</b></td>
                                <td>{tempResult.noProgramPlanCount}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            setShowModal(true)
                                            setChosenError("No Program Plan for students")
                                        }}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <br /><br />

                    {(count === 1) ?
                        <a href={`${url}/api/report/grade/single/${chosenStudentList[0]}`} target="_blank" rel="noreferrer">
                            <Button>
                                Download single report
                            </Button>
                        </a>
                        :
                        <a href={`${url}/api/report/grade/zip`} download="Degreeworks-All.zip">
                            <Button>
                                Download all reports in zip
                            </Button>
                        </a>
                    }
                    <Modal
                        opened={showModal}
                        onClose={() => setShowModal(false)}
                        title={chosenError}
                    >
                        {(chosenError === "Students have no record in Argo10") ?
                            [...tempResult.noArgo10Id].map((item, index) => {
                                return <p key={index}>{item}</p>
                            }) :
                            (chosenError === "No Program Plan for students") ?
                                [...tempResult.noProgramPlanId].map((item, index) => {
                                    return <p key={index}>{item}</p>
                                }) : <></>
                        }

                    </Modal>
                </>
                : <></>}

        </>
    )

}

export default Grade;