import { useSelector, useDispatch } from "react-redux";
import { TextInput, Button } from '@mantine/core';

import { setURL } from '../redux/setting'

const SettingComponent = (props) => {

    //Redux
    const { url } = useSelector((state) => state.setting);
    const dispatch = useDispatch();



    return (
        <div style={{ height: '100%' }}>

            <div style={{ backgroundColor: 'lightgrey', padding: 10, borderRadius: 10 }}>
                <Button
                    onClick={() => dispatch(setURL((process.env.REACT_APP_SERVER_URL !== undefined) ? process.env.REACT_APP_SERVER_URL : ''))} >
                    Local Server
                </Button>
                <Button
                    onClick={() => { dispatch(setURL("")); dispatch(setURL("https://tomcat.johnnyip.com/ar")) }} >
                    Remote Server (When local server didn't work)
                </Button>

                <TextInput
                    value={url}
                    label="Server URL"
                    onChange={(e) => dispatch(setURL(e.target.value))} />
            </div>


        </div>
    )
}

export default SettingComponent;