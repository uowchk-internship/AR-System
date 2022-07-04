import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { TextInput, Button, Collapse } from '@mantine/core';
import { Settings } from 'tabler-icons-react';

import { setURL } from '../redux/setting'


const Header = (props) => {
    let status = props.status

    //Redux
    const { url } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    const [showSetting, setShowSetting] = useState(false)


    return (
        <>
            <div style={{ display: 'inline-block', marginRight: 20 }} >
                <h2>
                    Server Status:
                    {
                        (status) ?
                            <span style={{ color: 'green' }}> Connected</span> :
                            <span style={{ color: 'red' }}> Not connected</span>

                    }
                </h2>
            </div>
            <div style={{ display: 'inline-block' }}>
                <Button leftIcon={<Settings size={20} />} onClick={() => setShowSetting(!showSetting)}>
                    Settings
                </Button>
            </div>

            <Collapse in={showSetting}>
                <div style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                    <Button
                        onClick={() => { dispatch(setURL("")); dispatch(setURL("https://tomcat.johnnyip.com/ar")) }} >
                        Remote Server (For Test)
                    </Button>
                    <Button
                        onClick={() => dispatch(setURL("http://localhost:8080"))} >
                        Local Server
                    </Button>

                    <TextInput
                        value={url}
                        label="Server URL"
                        onChange={(e) => dispatch(setURL(e.target.value))} />
                </div>

            </Collapse>

        </>
    )
}

export default Header;