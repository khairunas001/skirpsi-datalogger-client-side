import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function Form() {
  const [tanggal, setTanggal] = useState('');  // Tanggal dalam format Date
  const [waktu, setWaktu] = useState('');      // Waktu dalam format Time
  const [suhu, setSuhu] = useState(0);         // Suhu sebagai float
  const [sv, setSv] = useState(0);             // Set Value sebagai float
  const URL = process.env.REACT_APP_API_URL_2;  // API URL dari env

  const addHandler = () => {
    axios({
      method: 'POST',
      url: `${URL}/loggers`,
      data: {
        tanggal: tanggal,          // Tanggal dalam format Date
        waktu: waktu,              // Waktu dalam format Time
        suhu: parseFloat(suhu),    // Konversi suhu ke float
        sv: parseFloat(sv),        // Konversi set value ke float
      }
    })
    .then(result => {
      console.log(result.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className='input-form'>
      <div className='form-item'>
        <label>
          Tanggal (YYYY-MM-DD):
        </label>
        <input 
          type='date'              // Menggunakan input type date untuk format Date
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)} 
        />
      </div>
      <div className='form-item'>
        <label>
          Waktu (HH:MM:SS):
        </label>
        <input 
          type='time'              // Menggunakan input type time untuk format Time
          value={waktu}
          onChange={(e) => setWaktu(e.target.value)} 
        />
      </div>
      <div className='form-item'>
        <label>
          Suhu (float):
        </label>
        <input 
          type='number'            // Menggunakan input type number
          placeholder='Suhu' 
          value={suhu}
          onChange={(e) => setSuhu(e.target.value)} 
        />
      </div>
      <div className='form-item'>
        <label>
          Set Value (float):
        </label>
        <input 
          type='number'            // Input untuk set value
          placeholder='Set Value'
          value={sv}
          onChange={(e) => setSv(e.target.value)} 
        />
      </div>
      <div className='submit-form'>
        <button onClick={addHandler}>
          Add Data
        </button>
      </div>
    </div>
  );
}

export default Form;
