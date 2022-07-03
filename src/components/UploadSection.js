import * as XLSX from 'xlsx';

import Argo10 from './uploadSource/argo10'
import Argo11 from './uploadSource/argo11'
import Argo16 from './uploadSource/argo16'
import Argo29 from './uploadSource/argo29'

function UploadSection() {


    return (
        <div>
            <Argo10 />
            <Argo11 />
            <Argo16 />
            <Argo29 />
        </div>
    );
}

export default UploadSection;
