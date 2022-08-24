import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { AppShell, Navbar } from '@mantine/core';


import UploadSection from './components/uploadSource/uploadSection'
import Degreeworks from './components/reports/degreeworks'
import ExamHomeComponent from './components/reports/exam/examHome'
import AttendanceComponent from './components/reports/attendance'
import MoodleCSVComponent from './components/reports/moodle'
import LoginComponent from './components/login'

import SettingComponent from './components/setting'
import NavBarItem from './components/navBarItem'
import './style.css'

import { checkLoginStatus } from './functions/login'
import { checkServerStatus } from './functions/CheckStatus'
// import { Login } from 'tabler-icons-react';

function App() {
  //Redux
  const { url } = useSelector((state) => state.setting);

  const [status, setStatus] = useState(false)
  const [chosenTab, setChosenTab] = useState("")
  const [height, setHeight] = useState(0)

  const [signedIn, setSignedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    // console.log("env: "+JSON.stringify(process.env))
    // console.log("env - SERVER_URL: "+process.env.REACT_APP_SERVER_URL)

    const fetchStatus = async () => {
      setStatus(await checkServerStatus(url))
      let loginStatus = await checkLoginStatus(url)

      if (loginStatus === "") {
        // setSignedIn(false)
        // setUsername("")
      } else {
        setSignedIn(true)
        setUsername(loginStatus)
      }
    }

    // if (needReload){
    fetchStatus()
    // }

    if (typeof (window.innerWidth) == 'number') {
      setHeight(window.innerHeight - 20)
    }
  })

  return (
    <div className="App" >

      <AppShell
        padding="md"

        navbar={
          <Navbar width={{ base: 300 }} height={height} p="xs">
            <NavBarItem
              status={status}
              signedIn={signedIn}
              username={username}
              setChosenTab={setChosenTab}
              setSignedIn={setSignedIn}
              chosenTab={chosenTab} />
          </Navbar>}

        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >

        {
          (chosenTab === "setting") ?
            <SettingComponent setSignedIn={setSignedIn} /> :

            (status) ?
              (signedIn) ?
                (chosenTab === "upload") ?
                  <UploadSection /> :
                  (chosenTab === "degreeworks") ?
                    <Degreeworks username={username} /> :
                    (chosenTab === "exam") ?
                      <ExamHomeComponent username={username} /> :
                      (chosenTab === "attendance") ?
                        <AttendanceComponent username={username} /> :
                        (chosenTab === "moodle") ?
                          <MoodleCSVComponent username={username} /> :
                          <>
                            <h2>Please choose tabs on the left</h2>
                          </> :
                // if not signed in
                <>
                  <LoginComponent
                    setSignedIn={setSignedIn}
                  />
                </>
              :
              <>
                <h1>Unable to connect to backend server.</h1>
                <h2>Please check the server url in "Settings"</h2>
              </>
        }
      </AppShell>

    </div>
  );
}

export default App;
