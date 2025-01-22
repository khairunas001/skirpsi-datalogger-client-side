import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Pastikan file CSS diimport

const GetMyLogger = () => {
  const [formData, setFormData] = useState({
    tanggal: '',
    waktu_awal: '',
    waktu_akhir: ''
  });

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler untuk input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Format waktu dengan detik
  const formatTime = (time) => {
    return `${time}:00`; // Menambahkan detik ke format waktu
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Format data sebelum dikirim ke API
    const formattedTanggal = formData.tanggal;
    const formattedWaktuAwal = formatTime(formData.waktu_awal);
    const formattedWaktuAkhir = formatTime(formData.waktu_akhir);
  
    // Bangun URL dengan query parameter
    const queryURL = `${process.env.REACT_APP_API_URL_2}/loggers/logs-by-date-and-time-range`;
    const params = {
      tanggal: formattedTanggal,
      waktu_awal: formattedWaktuAwal,
      waktu_akhir: formattedWaktuAkhir,
    };
  
    axios({
      method: 'GET',
      url: queryURL,
      params, // Mengirim parameter query sebagai objek
    })
      .then((response) => {
        if (response.data.status === 'success') {
          setLogs(response.data.data); // Mengatur state logs
        } else {
          setLogs([]); // Kosongkan logs jika tidak ada data ditemukan
          setError('No logs found for the specified range.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };  

  // Fungsi untuk mengunduh log dalam format JSON
  const downloadLogsAsJSON = () => {
    const jsonString = JSON.stringify(logs, null, 2); // Indentasi 2 spasi untuk kejelasan
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_${formData.tanggal}_${formData.waktu_awal}_${formData.waktu_akhir}.json`;
    link.click();
    URL.revokeObjectURL(url); // Membersihkan URL blob setelah digunakan
  };

  return (
    <div className="table">
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Masukkan Waktu Logging</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="tanggal">Tanggal:</label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="waktu_awal">Waktu Mulai (24 Jam):</label>
              <input
                type="time"
                id="waktu_awal"
                name="waktu_awal"
                value={formData.waktu_awal}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="waktu_akhir">Waktu Berakhir (24 Jam):</label>
              <input
                type="time"
                id="waktu_akhir"
                name="waktu_akhir"
                value={formData.waktu_akhir}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Kirim</button>
          </form>
        </div>
        <button onClick={downloadLogsAsJSON} className="download-button">Download JSON</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {logs.length > 0 && (
        <div>
          <table className="center-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Suhu</th>
                <th>Set Value</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.tanggal}</td>
                  <td>{log.waktu}</td>
                  <td>{log.suhu}</td>
                  <td>{log.sv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetMyLogger;
