import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';

function ExamHomeComponent(props) {
    // const [activeTab, setActiveTab] = useState("");

    return (
        <>
            <div style={{ paddingTop: 20 }}>

                <SegmentedControl fullWidth size="lg"

                    data={[
                        { label: "Exam Timetable", value: "timetable" },
                        { label: "Exam Information", value: "info" },
                        { label: "Exam Attendance Register", value: "attendance" },
                        { label: "Exam Board", value: "board" }
                    ]} />

            </div>
        </>
    )
}

export default ExamHomeComponent;