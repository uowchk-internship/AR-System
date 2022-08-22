import { useState } from 'react'
import { useSelector } from "react-redux";
import { TextInput, PasswordInput, Button, Badge } from '@mantine/core';

import { login } from '../functions/login'

const Login = (props) => {
    let setSignedIn = props.setSignedIn

    //Redux
    const { url } = useSelector((state) => state.setting);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)

    const loginHandler = async () => {
        setLoading(true)

        if ((url !== "https://tomcat.johnnyip.com/ar" && username !== "demo") || url === "https://tomcat.johnnyip.com/ar") {
            let result = await login(url, username, password)
            console.log(result)
            if (result === "") { setError(true) }
            else { setSignedIn(true) }    
        }else{
            setError(true)
        }


        setLoading(false)
    }

    return (
        <div style={{ width: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <Badge size="xl" radius="md" style={{ width: "50%" }}>
                Login
            </Badge>
            <br /><br />
            <h2>Signing into [{(url === "https://tomcat.johnnyip.com/ar") ? "Remote" : "School Server"}]</h2>

            <h3>Username</h3>
            <TextInput
                required
                name="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value.toLowerCase()) }} />

            <h3>Password</h3>
            <PasswordInput
                required
                name="password"
                value={password}
                onKeyPress={async (e) => {
                    if (e.key === 'Enter') {
                        await loginHandler()
                    }
                }}
                onChange={(e) => { setPassword(e.target.value) }} />

            {(error) ?
                <p style={{ color: 'red' }}>Login failed.</p> : <></>}

            <br />
            <Button
                loading={loading}
                onClick={async () => {
                    await loginHandler()
                }}>Login</Button>
            {(url === "https://tomcat.johnnyip.com/ar") ?
                <Button
                    onClick={async () => {
                        setUsername("demo")
                        setPassword("demo")
                    }}>Load demo account</Button>
                : <></>}
        </div>
    )
}

export default Login;