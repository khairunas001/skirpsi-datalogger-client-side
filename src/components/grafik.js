import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import '../App.css';

const Grafik = () => {
  const [data, setData] = useState({ waktu: [], suhu: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:3000/loggers')
        .then(response => {
          const loggers = response.data;

          // Filter dan konversi data
          const validLoggers = loggers.filter(logger => logger.suhu !== null);
          const waktu = validLoggers.map(logger => logger.waktu);
          const suhu = validLoggers.map(logger => logger.suhu);

          setData({ waktu, suhu });
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchData(); // Ambil data pertama kali

    const interval = setInterval(fetchData, 100); // Polling setiap 100ms

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []);

  useEffect(() => {
    if (!chartRef.current && data.waktu.length && data.suhu.length) {
      const ctx = document.getElementById('grafik').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.waktu,
          datasets: [{
            label: 'Suhu',
            data: data.suhu,
            borderColor: 'rgba(75, 192, 192, 1)', // Warna garis
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Warna area bawah garis
            borderWidth: 2,
            fill: true, // Aktifkan pengisian area bawah garis
          }],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Waktu Indonesia Barat GMT+7',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Suhu (°C)',
              },
            },
          },
        },
      });
    } else if (chartRef.current) {
      // Perbarui data grafik
      chartRef.current.data.labels = data.waktu;
      chartRef.current.data.datasets[0].data = data.suhu;
      chartRef.current.update();
    }
  }, [data]);

  return (
    <div>
      <h1>Grafik Suhu</h1>
      <canvas id="grafik" width={300} height={300}></canvas>
    </div>
  );
};

export default Grafik;
