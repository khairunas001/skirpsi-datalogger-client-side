import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import '../App.css';

const Grafik = () => {
  const [data, setData] = useState({ waktu: [], suhu: [] });
  const chartRef = useRef(null);
  const canvasRef = useRef(null); // Gunakan useRef untuk referensi elemen canvas

  useEffect(() => {
    const fetchData = () => {
      axios.get(process.env.REACT_APP_API_URL)
        .then(response => {
          const loggers = response.data.data || []; // Pastikan data diakses dengan benar

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

    const interval = setInterval(fetchData, 1000); // Polling setiap 1000ms (1 detik)

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []);

  useEffect(() => {
    if (!chartRef.current && data.waktu.length && data.suhu.length) {
      const ctx = canvasRef.current.getContext('2d'); // Gunakan canvasRef untuk mengakses elemen canvas
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
      {/* Ganti id dengan ref */}
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  );
};

export default Grafik;