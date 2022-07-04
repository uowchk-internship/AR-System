import { useSelector } from "react-redux";
import { Button } from '@mantine/core';

const Grade = () => {
    const { url } = useSelector((state) => state.setting);

    const openInNewTab = (url) => {
        const newWindow = window.open(url)
        if (newWindow) newWindow.opener = null
    }

    return (
        <>
            <Button
                onClick={() => openInNewTab(`${url}/api/report/grade/`)}>
                Download single report
                </Button>

            <Button
                onClick={() => openInNewTab(`${url}/api/report/grade/zip`)}>
                Download all reports in zip
            </Button>
        </>
    )

}

export default Grade;