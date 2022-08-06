import { Navbar, Button, Badge, ScrollArea } from '@mantine/core';
import { CloudUpload, Settings, Checklist, Book, ListCheck, Books, Checkbox, ReportAnalytics } from 'tabler-icons-react';


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
            <Navbar.Section grow mt="md" component={ScrollArea}>
                <div >
                    <hr />
                    <h3>Import Section</h3>
                </div>

                <Button variant={chosenTab === "upload" ? "filled" : "subtle"}
                    color={chosenTab === "upload" ? "" : "gray"}
                    leftIcon={<CloudUpload />}
                    disabled={!status}
                    onClick={() => setChosenTab("upload")}
                    style={{ width: '100%', height: "50px", textAlign: "left"}}>
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
                    disabled={!status}
                    onClick={() => setChosenTab("degreeworks")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Degreeworks</h2>
                </Button>

                <Button variant={chosenTab === "exam" ? "filled" : "subtle"}
                    color={chosenTab === "exam" ? "" : "gray"}
                    leftIcon={<Book />}
                    disabled={!status}
                    onClick={() => setChosenTab("exam")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Exam Related</h2>
                </Button>

                <Button variant={chosenTab === "grad" ? "filled" : "subtle"}
                    color={chosenTab === "grad" ? "" : "gray"}
                    leftIcon={<Checkbox />}
                    disabled={!status}
                    onClick={() => setChosenTab("grad")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Graduation List</h2>
                </Button>

                <Button variant={chosenTab === "moodle" ? "filled" : "subtle"}
                    color={chosenTab === "moodle" ? "" : "gray"}
                    leftIcon={<Books />}
                    disabled={!status}
                    onClick={() => setChosenTab("moodle")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Moodle List</h2>
                </Button>

                <Button variant={chosenTab === "attendance" ? "filled" : "subtle"}
                    color={chosenTab === "attendance" ? "" : "gray"}
                    leftIcon={<ListCheck />}
                    disabled={!status}
                    onClick={() => setChosenTab("attendance")}
                    style={{ width: '100%', height: "50px" }}>
                    <h2>Attendance List</h2>
                </Button>

                <Button variant={chosenTab === "grade" ? "filled" : "subtle"}
                    color={chosenTab === "grade" ? "" : "gray"}
                    leftIcon={<ReportAnalytics />}
                    disabled={!status}
                    onClick={() => setChosenTab("grade")}
                    style={{ width: '100%', height: "50px", textAlign: "left"}}>
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
            </Navbar.Section>

        </>
    )
}