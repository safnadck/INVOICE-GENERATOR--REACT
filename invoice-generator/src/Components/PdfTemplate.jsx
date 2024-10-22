import React, { useRef, useState } from "react";
import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Barcode from "react-barcode";
import './PdfTemplate.css'

function PdfTemplate({ invoiceNumber, date }) {
  const ref = useRef();
  const [openAirPopup, setAirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const addData = () => {
    if (item && amount) {
      setList([...list, { product: item, amount: parseFloat(amount) }]);
      setItem('');
      setAmount('');
      setAirPopup(false);
    } else {
      alert("Please fill in both fields!");
    }
  };

  const sum = list.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(ref.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="container" ref={ref}>
        <div>
          <Barcode value={`Invoice-${invoiceNumber}`} width={1} height={50} displayValue={false} />
          <h2>INVOICE</h2>
          <h5>Invoice ID: {invoiceNumber}</h5>
          <h5>Date: {date}</h5>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>₹ {item.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total:</strong></td>
                <td>₹ {sum.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button type="button" onClick={handlePrint} className="button2">Print</button>

      <button onClick={() => setAirPopup(true)} className="button2">Add Products</button>

      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div>
            New Product
            <Close onClick={() => setAirPopup(false)} style={{ cursor: 'pointer' }} />
          </div>
        </DialogTitle>
        <DialogContent>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Product name"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button onClick={addData}>Add</button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PdfTemplate;
