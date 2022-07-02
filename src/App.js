import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import UploadSection from './components/UploadSection'
import Header from './components/Header'
import './style.css'

import { checkStatus } from './functions/CheckStatus'

function App() {
  //Redux
  const { url } = useSelector((state) => state.setting);

  const [status, setStatus] = useState(false)

  useEffect(() => {
    const fetchStatus = async () => {
      console.log("checking")
      setStatus(await checkStatus(url))
    }

    fetchStatus()


  })

  return (
    <div className="App" >
      <div className="center">

        <Header status={status} />

      </div>

      <hr />

      {
        (status) ?
          <div style={{ backgroundColor: 'lightgray', padding: 20 }}>
            <UploadSection />
          </div > : <></>

      }

    </div>
  );
}

export default App;
