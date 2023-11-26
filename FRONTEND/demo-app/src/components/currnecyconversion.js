import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(amount);
  const [todisplay,setTodisplay]= useState(false);
  const handleConvert=()=>{
    setConvertedAmount(amount*2);
    setTodisplay(true);
  }
  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>Enter the value in Indian Currency:</label>
        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div>
        {!todisplay?(<p></p>):(<h2>Converted Amount: {convertedAmount}</h2>)}
        
      </div>
    </div>
  );
};

export default CurrencyConverter;
