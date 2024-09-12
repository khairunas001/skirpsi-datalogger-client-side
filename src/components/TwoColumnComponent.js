import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TwoColumnComponent.css';

const TwoColumnComponent = () => {
  const [data, setData] = useState({ suhu: '', sv: '' });
  const URL = process.env.REACT_APP_API_URL_2; // URL diambil dari environment variable

  const getData = () => {
    axios({
      method: 'GET',
      url: `${URL}/loggers/currentvalue`,
    })
      .then(response => {
        if (response.data.status === 'success') {
          const loggerData = response.data.data[0]; // Mengambil item pertama dari array data
          setData({ suhu: loggerData.suhu, sv: loggerData.sv });
        } else {
          console.log('No data found');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(); // Ambil data pertama kali saat komponen dimount

    const interval = setInterval(() => {
      getData(); // Panggil getData setiap 1 detik
    }, 1000); // Interval 1 detik

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container">
      <div className="column">
        <label className="label">Process Value</label>
        {/* Ubah warna font jika suhu lebih besar dari sv */}
        <div
          className="box"
          style={{ color: data.suhu > data.sv ? 'red' : 'black' }}
        >
          {data.suhu}&deg;C
        </div>
      </div>
      <div className="column">
        <label className="label">Set Value</label>
        <div className="box">{data.sv}&deg;C</div>
      </div>
    </div>
  );
};

export default TwoColumnComponent;
