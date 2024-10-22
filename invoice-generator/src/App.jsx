import React, { useEffect, useState } from "react";
import PdfTemplate from "./Components/PdfTemplate";
import './App.css';

function App() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dates, setDates] = useState('');
  const [view, setView] = useState(true);

  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    setDates(date);
  }, []);

  const create = () => {
    if (invoiceNumber.trim() === '') {
      alert('Invoice number cannot be empty!');
      return;
    }
    setView(false);
  };

  return (
    <>
      {view ? (
        <div className="container">
          <div className="form">
            <input
              type="text"
              placeholder='Invoice number'
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <button onClick={create}>Create</button>
          </div>
        </div>
      ) : (
        <PdfTemplate invoiceNumber={invoiceNumber} date={dates} />
      )}
    </>
  );
}

export default App;
