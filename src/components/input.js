import React ,{useState, useEffect}from 'react';
import '../App.css';
import axios from 'axios'

function Form(){
   
    const [tanggal, setTanggal]=useState('');
    const [waktu, setWaktu]=useState('');
    const [suhu, setSuhu]=useState(0);
    const URL = process.env.REACT_APP_API_URL_2;

    const addHandler = () =>{
        axios ({
            method:'POST',
            url: `${URL}/loggers`,
            data:{
                tanggal,waktu,suhu: +suhu
            }
        })
            .then(result =>{
                console.log(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    
    return(
        <div className='input-form'>
            <div className='form-item' onChange={(e) => setTanggal(e.target.value)}>
                <label>
                    Tanggal : 
                </label>
                <input type='text' placeholder='Tanggal'></input>
            </div>
            <div className='form-item' onChange={(e) => setWaktu(e.target.value)}>
                <label>
                    Waktu : 
                </label>
                <input type='text' placeholder='Waktu'></input>
            </div>
            <div className='form-item' onChange={(e) => setSuhu(e.target.value)}>
                <label>
                    Suhu : 
                </label>
                <input type='text' placeholder='Suhu'></input>
            </div>
            <div className='submit-form'>
                <button onClick={() => addHandler()}>
                    Add Income
                </button>
            </div>
        </div>
    )

}

export default Form;