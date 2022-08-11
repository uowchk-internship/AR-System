import { useState } from 'react'
import { useSelector } from "react-redux";
import { TextInput, PasswordInput, Button } from '@mantine/core';

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

        let result = await login(url, username, password)

        console.log(result)
        if (result === "") { setError(true) }
        else { setSignedIn(true) }

        setLoading(false)
    }

    return (
        <div style={{ width: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <h2>Login</h2>
            <br /><br />

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
        </div>
    )
}

export default Login;