import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { AppShell, Navbar } from '@mantine/core';

import UploadSection from './components/uploadSource/uploadSection'
import Degreeworks from './components/reports/degreeworks'
import ExamHomeComponent from './components/reports/exam/examHome'
import AttendanceComponent from './components/reports/attendance'

import SettingComponent from './components/setting'
import NavBarItem from './components/navBarItem'
import './style.css'

import { checkStatus } from './functions/CheckStatus'

function App() {
  //Redux
  const { url } = useSelector((state) => state.setting);

  const [status, setStatus] = useState(false)
  const [chosenTab, setChosenTab] = useState("")
  const [height, setHeight] = useState(0)

  useEffect(() => {
    console.log("env: "+JSON.stringify(process.env))
    console.log("env - SERVER_URL: "+process.env.SERVER_URL)
    const fetchStatus = async () => {
      setStatus(await checkStatus(url))
    }

    fetchStatus()

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
              setChosenTab={setChosenTab}
              chosenTab={chosenTab} />
          </Navbar>}

        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >

        {
          (chosenTab === "setting") ?
            <SettingComponent /> :
            (chosenTab === "upload") ?
              <UploadSection /> :
              (chosenTab === "degreeworks") ?
                <Degreeworks /> :
                (chosenTab === "exam") ?
                  <ExamHomeComponent /> :
                  (chosenTab === "attendance") ?
                    <AttendanceComponent /> :
                    <></>
        }
      </AppShell>

      {/* <div style={{ backgroundColor: 'lightgray', padding: 20 }}>
        <UploadSection />
        <Grade />
      </div > */}

    </div>
  );
}

export default App;
