import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';

import GeneralUploadComponent from './general/generalUpload'
import ExamUploadComponent from './exam/examUpload'

function UploadSectionComponent(props) {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <>
            <div style={{ paddingTop: 20 }}>

                <SegmentedControl fullWidth size="lg"
                    value={activeTab}
                    onChange={setActiveTab}
                    data={[
                        { label: "General Data", value: "general" },
                        { label: "Exam Related Data", value: "exam" },
                    ]} />
            </div>

            {(activeTab === "general") ?
                <GeneralUploadComponent /> :
                (activeTab === "exam") ?
                    <ExamUploadComponent /> :
                    <></>
            }
        </>
    )
}

export default UploadSectionComponent;