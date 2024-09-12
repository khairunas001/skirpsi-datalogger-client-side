// import React, { useState } from 'react';
// import '../App.css';
// import axios from 'axios';

// function SendSetValue() {
//   const [integerValue, setIntegerValue] = useState(0);  // Nilai integer untuk dikirim ke Arduino
//   const ARDUINO_URL = 'http://192.168.1.177';           // Alamat IP Arduino

//   const sendToArduino = () => {
//     axios({
//       method: 'POST',
//       url: `${ARDUINO_URL}/data`,  // Sesuaikan endpoint jika berbeda
//       data: {
//         value: integerValue        // Mengirimkan nilai integer
//       }
//     })
//     .then(result => {
//       console.log(result.data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   return (
//     <div className='input-form'>
//       <div className='form-item'>
//         <label>
//           Nilai (0-900):
//         </label>
//         <input 
//           type='number'            // Input untuk rentang integer
//           placeholder='Nilai Integer' 
//           min='0'
//           max='900'
//           value={integerValue}
//           onChange={(e) => setIntegerValue(e.target.value)} 
//         />
//       </div>
//       <div className='submit-form'>
//         <button onClick={sendToArduino}>
//           Kirim ke Arduino
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SendSetValue;

import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function SendSetValue() {
  const [integerValue, setIntegerValue] = useState(0);  // Nilai integer untuk dikirim ke Arduino
  const [loading, setLoading] = useState(false);        // State untuk menandai status loading
  const ARDUINO_URL = 'http://192.168.1.177';           // Alamat IP Arduino

  const sendToArduino = () => {
    if (integerValue >= 0 && integerValue <= 900) {     // Validasi nilai rentang
      setLoading(true);
      axios({
        method: 'POST',
        url: `${ARDUINO_URL}/data`,  // Sesuaikan endpoint jika berbeda
        data: {
          value: integerValue        // Mengirimkan nilai integer
        },
        timeout: 5000                // Timeout 5 detik untuk request
      })
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);           // Selesai loading
      });
    } else {
      alert("Nilai harus di antara 0 hingga 900.");     // Alert jika nilai di luar rentang
    }
  }

  return (
    <div className='input-form'>
      <div className='form-item'>
        <label>
          Nilai (0-900):
        </label>
        <input 
          type='number'            // Input untuk rentang integer
          placeholder='Nilai Integer' 
          min='0'
          max='900'
          value={integerValue}
          onChange={(e) => setIntegerValue(parseInt(e.target.value))}  // Pastikan value sebagai integer
        />
      </div>
      <div className='submit-form'>
        <button onClick={sendToArduino} disabled={loading}>  {/* Disable tombol saat loading */}
          {loading ? "Mengirim..." : "Kirim ke Arduino"}
        </button>
      </div>
    </div>
  );
}

export default SendSetValue;
