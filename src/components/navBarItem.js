import { Navbar, Button, Badge } from '@mantine/core';
import { CloudUpload, Settings, Checklist } from 'tabler-icons-react';


export default function NavBarItem(props) {
    let status = props.status
    let setChosenTab = props.setChosenTab
    let chosenTab = props.chosenTab

    return (
        <>
            {/* Header */}

            <Navbar.Section style={{ backgroundColor: "lightgray", borderRadius: 5 }}>
                <div style={{ display: 'inline-block', marginRight: 20 }} >
                    <h1>AR System</h1>
                    <h2 style={{ fontSize: 20 }}>
                        Server
                        {
                            (status) ?
                                <span style={{ color: 'green' }}> Connected</span> :
                                <span style={{ color: 'red' }}> Not connected</span>
                        }
                    </h2>
                    <p>
                        Hi, username.
                        <Button>Sign Out</Button>
                    </p>
                    {/* <Button>Sign In</Button> */}
                </div>
            </Navbar.Section>

            {/* Body */}
            <Navbar.Section >
                <div style={{ paddingBottom: 10 }}>
                    <hr />
                    <Badge size="xl" >Import Section</Badge>
                </div>

                <Button variant={chosenTab === "upload" ? "filled" : "subtle"}
                    color={chosenTab === "upload" ? "" : "gray"}
                    leftIcon={<CloudUpload />}
                    disabled={!status}
                    onClick={() => setChosenTab("upload")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Upload Data Source</h2>
                </Button>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
                <div style={{ paddingBottom: 10 }}>
                    <hr />
                    <Badge size="xl" >Reports Section</Badge>
                </div>

                <Button variant={chosenTab === "degreeworks" ? "filled" : "subtle"}
                    color={chosenTab === "degreeworks" ? "" : "gray"}
                    leftIcon={<Checklist />}
                    disabled={!status}
                    onClick={() => setChosenTab("degreeworks")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Degreeworks</h2>
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
            </Navbar.Section>

        </>
    )
}