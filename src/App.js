import * as XLSX from 'xlsx';



function App() {

  async function handleFileAsync(e) {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
  
    console.log(workbook);
    /* DO SOMETHING WITH workbook HERE */
  }

  function loadFromTextarea(){
      //Value from textarea
      let value = document.getElementById("textarea").value;

      //Loop through each character from value
      for (let i = 0; i < value.length; i++) {
        if (value.at(i)==='\n'){
          console.log("new Line")
        }
      }

  }
  
  return (
    <div className="App">
      Upload here: <br/>
      <input type="file" id="input_dom_element" onChange={handleFileAsync}/>


      <textarea id="textarea" onChange={()=>loadFromTextarea()}>

      </textarea>
    </div>
  );
}

export default App;
