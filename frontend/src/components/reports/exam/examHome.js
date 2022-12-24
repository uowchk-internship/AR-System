import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { SegmentedControl } from '@mantine/core';

import { updateHashmap } from "../../../functions/report/degreeworks";

import TimeTable from './timeTable';
import Information from './information'
import AttendanceRegister from './attendanceRegister'
import ExamBoard from './board'

function ExamHomeComponent(props) {
    const { url } = useSelector((state) => state.setting);

    let username_ = props.username
    let username = (username_ === "demo") ? "admin" : username_

    //tab state
    const [activeTab, setActiveTab] = useState("timetable");
    const [loaded, setLoaded] = useState(false);
    const [hashed, setHashed] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoaded(true);
            updateHashmap(url);
            setTimeout(() => {
                setHashed(true);
            }, 5000);

        };

        if (!loaded) {
            loadData();
        }
    })

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
                    ((!hashed) ?
                        <h1>Loading... (wait 6 seconds)</h1> :
                        (activeTab === "info") ?
                            <Information username={username} /> :
                            (activeTab === "timetable") ?
                                <TimeTable username={username} /> :
                                (activeTab === "attendance") ?
                                    <AttendanceRegister username={username} /> :
                                    (activeTab === "board") ?
                                        <ExamBoard username={username} /> : <></>

                    )
                }
            </div>

        </>
    )
}

export default ExamHomeComponent;