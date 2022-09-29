import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';

import Information from './information'

function ExamHomeComponent(props) {
    let username_ = props.username
    let username = (username_ === "demo") ? "admin" : username_

    //tab state
    const [activeTab, setActiveTab] = useState("");

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
                        <Information username={username} /> : <></>
                }
            </div>

        </>
    )
}

export default ExamHomeComponent;