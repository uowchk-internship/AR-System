import { Table, Modal, SegmentedControl } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import Argo5 from './argo5'
import Argo10 from './argo10'
import Argo11 from './argo11'
import Argo12 from './argo12'
import Argo16 from './argo16'
import Argo29 from './argo29'
import ExamBoardArgo from './ExamBoardArgo';
import ProgramPlan from './programPlan'
import Cge from './cge'

import { getArgo10Years } from '../../../functions/source/Argo10'

function GeneralUploadComponent() {
    const { url } = useSelector((state) => state.setting);

    const [programYears, setProgramYears] = useState([])
    const [fetched, setFetched] = useState(false)

    const [showData, setShowData] = useState(false)
    const [displayData, setDisplayData] = useState([])

    useEffect(() => {
        const getYears = async () => {
            let result = await getArgo10Years(url)
            setProgramYears(result)
            setFetched(true)
        }

        if (!fetched) {
            getYears()
        }
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
                    <Argo5 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Argo10 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Argo11 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Argo12 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Argo16 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Argo29 setShowData={setShowData} setDisplayData={setDisplayData} />
                    <ExamBoardArgo setShowData={setShowData} setDisplayData={setDisplayData} />
                    <Cge setShowData={setShowData} setDisplayData={setDisplayData} />

                    {programYears.length !== 0 ?
                        [...programYears].map((item, i) => {
                            return <ProgramPlan key={i} item={item}
                                setShowData={setShowData} setDisplayData={setDisplayData} />

                        })
                        : <></>}
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

export default GeneralUploadComponent;
