import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';

import TimeTable from './timeTable';
import Information from './information'
import AttendanceRegister from './attendanceRegister'
import ExamBoard from './board'

function ExamHomeComponent(props) {
    let username_ = props.username
    let username = (username_ === "demo") ? "admin" : username_

    //tab state
    const [activeTab, setActiveTab] = useState("timetable");

    return (
        <>
            <div style={{ paddingTop: 20 }}>

                <SegmentedControl fullWidth size="lg"
                    value={activeTab}
                    onChange={setActiveTab}
                    data={[
                        { label: "Exam Timetable", value: "timetable" },
                        { label: "Exam Information", value: "info" },
                        { label: "Exam Attendance Register", value: "attendance" },
                        { label: "Exam Board", value: "board" }
                    ]} />

                {
                    (activeTab === "info") ?
                        <Information username={username} /> :
                        (activeTab === "timetable") ?
                            <TimeTable username={username} /> :
                            (activeTab === "attendance") ?
                                <AttendanceRegister username={username} /> :
                                (activeTab === "board") ?
                                    <ExamBoard username={username} /> : <></>
                }
            </div>

        </>
    )
}

export default ExamHomeComponent;