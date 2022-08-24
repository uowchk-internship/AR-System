import { useSelector, useDispatch } from "react-redux";
import { TextInput, Button } from '@mantine/core';

import { setURL } from '../redux/setting'
import { logout } from '../functions/login'

const SettingComponent = (props) => {
    //Redux
    const { url } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    let setSignedIn = props.setSignedIn



    return (
        <div style={{ height: '100%' }}>

            <div style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                <Button
                    onClick={() => {
                        dispatch(setURL((process.env.REACT_APP_SERVER_URL !== undefined) ? process.env.REACT_APP_SERVER_URL : 'http://localhost:8080'))
                        setSignedIn(false)
                        logout()

                    }} >
                    Local Server
                </Button>
                <Button
                    onClick={() => {
                        dispatch(setURL(""));
                        dispatch(setURL("https://tomcat.johnnyip.com/ar"))
                        setSignedIn(false)
                        logout()
                    }} >
                    Remote Server (When local server didn't work)
                </Button>

                <TextInput
                    value={url}
                    label="Server URL"
                    onChange={(e) => {
                        dispatch(setURL(e.target.value))
                        setSignedIn(false)
                        logout()
                    }} />
            </div>

            <br />
            <a href="https://admin.johnnyip.com/sharing/ZqPeBXcGo" target="_blank">
                <Button>Download Docker-Compose files</Button>
            </a>


            <hr />
            <h3>Version: 1.1 (25 Aug 2022)</h3>

        </div>
    )
}

export default SettingComponent;