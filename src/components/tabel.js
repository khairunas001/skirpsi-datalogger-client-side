import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function Table() {
    const [loggers, setLoggers] = useState([]);
    const URL = process.env.REACT_APP_API_URL_2;

    const getLoggers = () => {
        axios({
            method: 'GET',
            url: `${URL}/loggers`,
        })
            .then(response => {
                if (response.data.status === 'success') {
                    // Mengambil loggers dari response.data.data
                    setLoggers(response.data.data);
                } else {
                    console.log('No logs found');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getLoggers(); // Ambil data pertama kali saat komponen dimount

        const interval = setInterval(() => {
            getLoggers();
        }, 1000); // Panggil getLoggers setiap 1 detik

        return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
    }, []);

    return (
        <div className='table'>
            <table className='center-table'>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Waktu</th>
                        <th>Process Value</th>
                        <th>Set Value</th>
                    </tr>
                </thead>
                <tbody>
                    {loggers.length !== 0 ? (
                        loggers.map((logger, index) => (
                            <tr key={index}>
                                <td>{logger.tanggal}</td>
                                <td>{logger.waktu} WIB</td>
                                <td>{logger.suhu} &deg;C</td>
                                <td>{logger.sv} &deg;C</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Tidak ada pembacaan data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
