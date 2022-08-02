import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { Button, Select, Group, Table, Modal } from '@mantine/core';

import { getArgo11Items, getProgramList, getTempExecuteResult } from '../../functions/source/Argo11'

const Grade = () => {
    const { url } = useSelector((state) => state.setting);

    const [studentList, setStudentList] = useState([])

    //Options
    const departmentOptionList = [
        { value: 'ALL', label: 'All' },
        { value: 'BU', label: 'BU' },
        { value: 'AH', label: 'AH' },
        { value: 'ST', label: 'ST' },
        { value: 'SS', label: 'SS' }
    ]
    const [programOptionList, setProgramOptionList] = useState([])
    const [studentIdOptionList, setStudentIdOptionList] = useState([])

    //Selected values
    const [chosenDepartment, setChosenDepartment] = useState("ALL")
    const [chosenProgram, setChosenProgram] = useState("ALL")
    const [chosenStudent, setChosenStudent] = useState("ALL")

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

    const filter = async (studentList_) => {        
        if (studentList_ === undefined) {
            studentList_ = studentList
        }

        let programOptions = [{ value: "ALL", label: "All" }]
        let studentOptions = [{ value: "ALL", label: "All" }]

        let programList = await getProgramList(url, chosenDepartment);


        for (let program of programList) {
            programOptions.push({ value: program, label: program })
        }


        console.log(studentList_[0])
        for (let student of studentList_) {
            //Student List
            let nameAfterConcat = `${student.progCode} (${student.programmeTitle})`
            if ((nameAfterConcat === chosenProgram) ||
                (chosenProgram === "ALL" && programList.includes(nameAfterConcat))) {
                studentOptions.push(
                    {
                        value: student.studentId,
                        label: `${student.studentId} (${student.firstName} ${student.lastName})`
                    }
                )
            }
        }

        setProgramOptionList(programOptions)
        setStudentIdOptionList(studentOptions)

        if (chosenStudent !== "ALL") {
            setCount(1)
        } else {
            setCount(studentOptions.length)
        }
    }

    const retrieveTempResult = async () => {
        setLoading(true)

        let result = await getTempExecuteResult(url);

        console.log(result)
        setTempResult(result)
        setLoading(false)
    }

    useEffect(() => {
        const loadData = async () => {
            let completeStudentList = await getArgo11Items(url)
            console.log(completeStudentList)

            setStudentList(completeStudentList)
            filter(completeStudentList)
            setLoaded(true)
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

            setCount(1)
            filter()
        } else if (chosenProgram !== oldProgram) {
            setOldProgram(chosenProgram)

            setChosenStudent("ALL")
            setOldStudent("ALL")

            filter()
        } else if (chosenStudent !== oldStudent) {
            setOldStudent(chosenStudent)
            filter()
        }

    })


    return (
        <>
            <h2 style={{ paddingTop: 100 }}>Download reports </h2>

            {/* <Group grow style={{ paddingLeft: 40, paddingRight: 40 }}> */}
            <Table
                class="reportTable"
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
            <div style={{ width: "50%", marginLeft: "25%", marginRight: "25%" }}>



            </div>
            {/* </Group> */}


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
            <h2>Result</h2>

            <Table
                striped highlightOnHover
                style={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}>
                <thead>
                    <th>Name</th>
                    <th>Count</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ color: "green" }}><b>Students generated</b></td>
                        <td>{tempResult.normalCount}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ color: "red" }}><b>Student Not in Argo11</b></td>
                        <td>{tempResult.noArgo11RecordCount}</td>
                        <td>
                            <Button
                                onClick={() => {
                                    setShowModal(true)
                                    setChosenError("Student Not in Argo11")
                                }}>
                                View
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "red" }}><b>No Program Plan for student</b></td>
                        <td>{tempResult.noProgramPlanCount}</td>
                        <td>
                            <Button
                                onClick={() => {
                                    setShowModal(true)
                                    setChosenError("No Program Plan for student")
                                }}>
                                View
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <br /><br />
            <a href={`${url}/api/report/grade/`} target="_blank">
                <Button>
                    Download single report
                </Button>
            </a>

            <a href={`${url}/api/report/grade/zip`} download="Degreeworks-All.zip">
                <Button>
                    Download all reports in zip
                </Button>
            </a>



            <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title={chosenError}
            >
                {(chosenError === "Student Not in Argo11") ?
                    [...tempResult.noArgo11Id].map((item, index) => {
                        return <p>{item}</p>
                    }) :
                    (chosenError === "No Program Plan for student") ?
                        [...tempResult.noProgramPlanId].map((item, index) => {
                            return <p>{item}</p>
                        }) : <></>
                }

            </Modal>

        </>
    )

}

export default Grade;