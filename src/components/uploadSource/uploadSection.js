import { Table } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import Argo10 from './argo10'
import Argo11 from './argo11'
import Argo16 from './argo16'
import Argo29 from './argo29'
import ProgramPlan from './programPlan'
import Cge from './cge'

import { getArgo10Years } from '../../functions/source/Argo10'

function UploadSection() {
    const { url } = useSelector((state) => state.setting);

    const [programYears, setProgramYears] = useState([])
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        const getYears = async () => {
            let result = await getArgo10Years(url)
            console.log(result)
            setProgramYears(result)
            setFetched(true)
        }

        if (!fetched) {
            getYears()
        }
    })
    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th width="30%">Name</th>
                        <th>Count</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <Argo10 />
                    <Argo11 />
                    <Argo16 />
                    <Argo29 />

                    <Cge />

                    {programYears.length !== 0 ?
                        [...programYears].map((item, i) => {
                            return <ProgramPlan key={i} item={item} />

                        })
                        : <></>}
                </tbody>
            </Table>

        </div>
    );
}

export default UploadSection;
