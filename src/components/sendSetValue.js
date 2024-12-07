// import React, { useState } from 'react';
// import '../App.css';
// import axios from 'axios';

// function SendSetValue() {
//   const [integerValue, setIntegerValue] = useState(0);  // Nilai integer untuk dikirim ke Arduino
//   const [loading, setLoading] = useState(false);        // State untuk menandai status loading
//   const ARDUINO_URL = 'http://192.168.1.177';           // Alamat IP Arduino

//   const sendToArduino = () => {
//     if (integerValue >= 0 && integerValue <= 900) {     // Validasi nilai rentang
//       setLoading(true);
//       axios({
//         method: 'POST',
//         url: `${ARDUINO_URL}/data`,  // Sesuaikan endpoint jika berbeda
//         data: {
//           value: integerValue        // Mengirimkan nilai integer
//         },
//         timeout: 5000                // Timeout 5 detik untuk request
//       })
//       .then(result => {
//         console.log(result.data);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);           // Selesai loading
//       });
//     } else {
//       alert("Nilai harus di antara 0 hingga 900.");     // Alert jika nilai di luar rentang
//     }
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
//           onChange={(e) => setIntegerValue(parseInt(e.target.value))}  // Pastikan value sebagai integer
//         />
//       </div>
//       <div className='submit-form'>
//         <button onClick={sendToArduino} disabled={loading}>  {/* Disable tombol saat loading */}
//           {loading ? "Mengirim..." : "Kirim ke Arduino"}
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
  const [error, setError] = useState("");               // State for error messages
  const [success, setSuccess] = useState(false);        // State for success message
  const ARDUINO_URL = 'http://192.168.1.177';           // Alamat IP Arduino

  const sendToArduino = () => {
    if (integerValue >= 0 && integerValue <= 900) {     // Validasi nilai rentang
      setLoading(true);
      setError("");                                     // Reset error
      setSuccess(false);                                // Reset success

      axios({
        method: 'POST',
        url: `${ARDUINO_URL}/data`,                    // Sesuaikan endpoint jika berbeda
        data: {
          value: integerValue                          // Mengirimkan nilai integer
        },
        timeout: 5000                                  // Timeout 5 detik untuk request
      })
      .then(result => {
        console.log(result.data);
        setSuccess(true);                              // Set success to true on successful request
      })
      .catch(err => {
        console.error(err);
        setError("Failed to send data to Arduino. Please try again."); // Set error message
      })
      .finally(() => {
        setLoading(false);                             // Selesai loading
      });
    } else {
      setError("Nilai harus di antara 0 hingga 900.");  // Set error if the value is out of range
    }
  }

  return (
    <div className='input-form'>
      <div className='form-item'>
        <label>
          Nilai (0-900):
        </label>
        <input 
          type='number'                                // Input untuk rentang integer
          placeholder='Nilai Integer' 
          min='0'
          max='900'
          value={integerValue}
          onChange={(e) => setIntegerValue(parseInt(e.target.value) || 0)}  // Handle non-numeric input
        />
      </div>

      {error && <div className='error-message'>{error}</div>}  {/* Show error message */}
      {success && <div className='success-message'>Data sent successfully!</div>}  {/* Show success message */}

      <div className='submit-form'>
        <button onClick={sendToArduino} disabled={loading || integerValue < 0 || integerValue > 900}>  {/* Disable tombol saat loading atau nilai salah */}
          {loading ? "Mengirim..." : "Kirim ke Arduino"}
        </button>
      </div>
    </div>
  );
}

export default SendSetValue;
