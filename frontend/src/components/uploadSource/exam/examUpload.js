import { Table, Modal, SegmentedControl, Badge } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import ExamDocument from './examDocument'
import ExamMaterial from './examMaterial'
import ExamSEN from './examSEN'
import Invigilators from './invigilators'

function ExamUploadComponent() {
    const { url } = useSelector((state) => state.setting);

    const [showData, setShowData] = useState(false)
    const [displayData, setDisplayData] = useState([])

    useEffect(() => {
    })
    return (
        <div>
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th>Count</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <ExamDocument setShowData={setShowData} setDisplayData={setDisplayData} />
                    <ExamMaterial setShowData={setShowData} setDisplayData={setDisplayData} />
                    <ExamSEN setShowData={setShowData} setDisplayData={setDisplayData} />

                </tbody>
            </Table>
            <br /><br /><br />

            <Badge color="dark" size="xl">Invidulators List</Badge>
            <br /><br />
            {/* Invidulators */}
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th>Count</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <Invigilators displayName="All" code="all" setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Invigilators displayName="Business" code="BU" setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Invigilators displayName="Arts and Humanities" code="AH" setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Invigilators displayName="Science and Technology" code="ST" setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Invigilators displayName="Social Science" code="SS" setShowData={setShowData} setDisplayData={setDisplayData} />
                </tbody>
            </Table>


            <Modal
                opened={showData}
                onClose={() => setShowData(false)}
                withCloseButton={false}
                size="55%"
            >
                <div style={{ textAlign: 'left' }}>
                    <pre>{JSON.stringify(displayData, null, '\t')}</pre>
                </div>
            </Modal>


        </div>
    );
}

export default ExamUploadComponent;
