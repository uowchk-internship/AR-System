import * as XLSX from 'xlsx';

import { readArgo10 } from './mongodb/mongodb'

function App() {

  async function handleFileAsync(e) {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data).Sheets["Sheet1"];
    console.log(workbook);

    let fileJson = XLSX.utils.sheet_to_json(workbook);
    console.log(fileJson);
    console.log(fileJson.length);    
  }

  const getFromDB = async () => {
    await readArgo10()
  }


  return (
    <div className="App">
      Upload here: <br />
      <input type="file" id="input_dom_element" onChange={handleFileAsync} />

      <button onClick={() => getFromDB()} >Get from db</button>
    </div>
  );
}

export default App;
