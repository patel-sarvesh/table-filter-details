import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import Table from './components/table/Table';
import Popup from './components/popup/popup';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const showDetails = (invoice) => {
    setSelectedInvoice(invoice);
  }

  const closePopup = () => {
    setSelectedInvoice(null);
  }

  useEffect( () => {
    getData();
  }, [])

  const getData = () => {
    axios.get('./data.csv', { responseType: 'blob',})
    .then(function (response) {
      // handle success
      convertDataIntoString(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  const convertDataIntoString = (data) => {
    data.text().then((csvStr) => {
      setInvoices(getFinalData(csvStr));
    })
  }

  const getFinalData = (csvStr) => {
    const lines=csvStr.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for(let i = 1; i < lines.length; i++){

        const obj = {};
        const currentline = lines[i].split(",");

        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = (currentline[j].includes('\r')) ? currentline[j].replace('\r', '') : currentline[j];
        }

        result.push(obj);

    }
    return result;
  }

  return (
    <>
      <div className="App">
        {invoices.length && <Table invoices={invoices} showDetails={showDetails}/>}
      </div>
      {selectedInvoice && <Popup invoice={selectedInvoice} close={closePopup} />}
    </>
  );
}

export default App;
