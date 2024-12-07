import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TwoColumnComponent.css';

const TwoColumnComponent = () => {
  const [data, setData] = useState({ suhu: '', sv: '' });
  const [currentTime, setCurrentTime] = useState({ date: '', time: '' }); // State untuk waktu dan tanggal sekarang
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

  const getTime = () => {
    // Mengambil waktu GMT+7 dari API WorldTimeAPI
    axios({
      method: 'GET',
      url: 'http://worldtimeapi.org/api/timezone/Asia/Jakarta',
    })
      .then(response => {
        const dateTime = new Date(response.data.datetime); // Konversi ISO string ke Date object

        // Mendapatkan waktu (HH:mm:ss)
        const time = dateTime.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit', // Tambahkan detik
          hour12: false, // Format 24 jam
        });

        // Mendapatkan tanggal (dd-mm-yyyy)
        const date = dateTime.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        setCurrentTime({ date, time }); // Simpan tanggal dan waktu ke state currentTime
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(); // Ambil data suhu dan sv
    getTime(); // Ambil waktu pertama kali

    const interval = setInterval(() => {
      getData(); // Panggil getData setiap 1 detik
      getTime(); // Panggil getTime setiap 1 detik untuk update waktu dan tanggal
    }, 1000);

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container">
      {/* Tampilkan waktu dan tanggal sekarang di bagian atas */}
      <div className="time-label">
        <label>Waktu Sekarang: {currentTime.time}</label><br />
        <label>Tanggal: {currentTime.date}</label>
      </div>

      {/* Kolom dibungkus di dalam .column-container agar horizontal */}
      <div className="column-container">
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
    </div>
  );
};

export default TwoColumnComponent;
