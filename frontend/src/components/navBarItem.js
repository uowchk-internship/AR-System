import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { Navbar, Button, ScrollArea } from '@mantine/core';
import { CloudUpload, Settings, Checklist, Book, ListCheck, Books, Checkbox, ReportAnalytics, Help } from 'tabler-icons-react';

import { logout } from '../functions/login'
import { Version } from '../functions/CheckStatus'

export default function NavBarItem(props) {
    //Redux
    const { url } = useSelector((state) => state.setting);

    let status = props.status
    let setChosenTab = props.setChosenTab
    let chosenTab = props.chosenTab
    let signedIn = props.signedIn
    let username = props.username
    let setSignedIn = props.setSignedIn

    const [backendVersion, setBackendVersion] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchStatus = async () => {
            setBackendVersion(await Version(url))
        }
        fetchStatus()

    })

    let isAdmin = (username === "admin" ||
        username === "demo") ? true : false

    return (
        <>
            {/* Header */}

            <Navbar.Section style={{ backgroundColor: "lightgray", borderRadius: 5 }}>
                <div style={{ display: 'inline-block' }} >
                    <h1>UOWCHK AR System</h1>
                    <h2 style={{ fontSize: 20 }}>
                        Server
                        {
                            (status) ?
                                <span style={{ color: 'green' }}> Connected</span> :
                                <span style={{ color: 'red' }}> Not connected</span>
                        }
                    </h2>

                    {(signedIn) ?
                        <>
                            <p>
                                Signed in as <b>{username}</b>.
                            </p>
                            <Button
                                onClick={() => {
                                    logout()
                                    setSignedIn(false)

                                }}
                            >Sign Out</Button>
                        </>
                        : <>
                            <p>
                                Please Sign in
                            </p>
                            <Button
                                disabled={(status) ? false : true}
                                onClick={() => setChosenTab("")}
                            >Sign in</Button>
                        </>
                    }
                    {/* <Button>Sign In</Button> */}
                </div>
            </Navbar.Section>

            {/* Body */}
            <Navbar.Section grow mt="md" component={ScrollArea}>
                <div >
                    <hr />
                    <h3>Import Section</h3>
                </div>

                <Button variant={chosenTab === "upload" ? "filled" : "subtle"}
                    color={chosenTab === "upload" ? "" : "gray"}
                    leftIcon={<CloudUpload />}
                    disabled={!signedIn}
                    onClick={() => setChosenTab("upload")}
                    style={{ width: '100%', height: "50px", textAlign: "left" }}>
                    <h2 className="navBtn">Upload Data Source</h2>
                </Button>


                {/* Reports Section */}
                <div style={{ paddingBottom: 10 }}>
                    <hr />
                    <h3>Reports Section</h3>
                </div>

                <Button variant={chosenTab === "degreeworks" ? "filled" : "subtle"}
                    color={chosenTab === "degreeworks" ? "" : "gray"}
                    leftIcon={<Checklist />}
                    disabled={!status || !signedIn}
                    onClick={() => setChosenTab("degreeworks")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Degreeworks</h2>
                </Button>

                <Button variant={chosenTab === "exam" ? "filled" : "subtle"}
                    color={chosenTab === "exam" ? "" : "gray"}
                    leftIcon={<Book />}
                    disabled={!status || !signedIn}
                    onClick={() => setChosenTab("exam")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Exam Related</h2>
                </Button>

                <Button variant={chosenTab === "grad" ? "filled" : "subtle"}
                    color={chosenTab === "grad" ? "" : "gray"}
                    leftIcon={<Checkbox />}
                    // disabled={!status || !signedIn}
                    disabled={true}
                    onClick={() => setChosenTab("grad")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Graduation List</h2>
                </Button>

                <Button variant={chosenTab === "moodle" ? "filled" : "subtle"}
                    color={chosenTab === "moodle" ? "" : "gray"}
                    leftIcon={<Books />}
                    disabled={!status || !signedIn}
                    onClick={() => setChosenTab("moodle")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Moodle List</h2>
                </Button>

                <Button variant={chosenTab === "attendance" ? "filled" : "subtle"}
                    color={chosenTab === "attendance" ? "" : "gray"}
                    leftIcon={<ListCheck />}
                    disabled={!status || !signedIn}
                    onClick={() => setChosenTab("attendance")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Attendance List</h2>
                </Button>

                <Button variant={chosenTab === "grade" ? "filled" : "subtle"}
                    color={chosenTab === "grade" ? "" : "gray"}
                    leftIcon={<ReportAnalytics />}
                    // disabled={!status || !signedIn}
                    disabled={true}
                    onClick={() => setChosenTab("grade")}
                    style={{ width: '100%', height: "50px", textAlign: "left" }}>
                    <h2 className="navBtn">Grade Sheet</h2>
                </Button>

            </Navbar.Section>


            {/* Footer */}
            <Navbar.Section>
                <hr />
                <Button variant={chosenTab === "setting" ? "filled" : "subtle"}
                    color={chosenTab === "setting" ? "" : "gray"}
                    leftIcon={<Settings />}
                    onClick={() => setChosenTab("setting")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Settings</h2>
                </Button>

                <a href="https://johnnyip.com/ar/" target="_blank">
                    <Button variant={"outline"}
                        leftIcon={<Help />}
                        style={{ width: '100%', height: "50px" }}>
                        <h2>User Guide</h2>
                    </Button>
                </a>
                <p>Version: <b>Front</b> 1.2 <b>Back</b> {backendVersion}</p>

            </Navbar.Section>

        </>
    )
}