import { Table, Modal, SegmentedControl } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import ExamDocument from './examDocument'
import ExamMaterial from './examMaterial'
import ExamSEN from './examSEN'

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
                    {/* <ExamDocument setShowData={setShowData} setDisplayData={setDisplayData} />
                    <ExamMaterial setShowData={setShowData} setDisplayData={setDisplayData} />
                    <ExamSEN setShowData={setShowData} setDisplayData={setDisplayData} /> */}

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
