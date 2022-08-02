import * as XLSX from 'xlsx';
import { Table } from '@mantine/core';


import Argo10 from './argo10'
import Argo11 from './argo11'
import Argo16 from './argo16'
import Argo29 from './argo29'
import ProgramPlan from './programPlan'
import Cge from './cge'

function UploadSection() {


    return (
        <div>
            <Table >
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

                    <ProgramPlan />
                    <Cge />

                </tbody>
            </Table>

        </div>
    );
}

export default UploadSection;
