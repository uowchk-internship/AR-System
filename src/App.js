import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { AppShell, Navbar, Header, Button, Aside, Footer } from '@mantine/core';

import UploadSection from './components/uploadSection'
import Grade from './components/reports/grade'

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
    const fetchStatus = async () => {
      console.log("checking")
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
                <Grade /> :
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
