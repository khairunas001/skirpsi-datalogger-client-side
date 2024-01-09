import React ,{useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios'

function Table(){

    const [loggers, setLoggers]=useState([]);
    const URL = "http://localhost:3000";

    const getLoggers = ()=>{
        axios({
            method:"GET",
            url:`${URL}/loggers`
        })
            .then(loggers=>{
                setLoggers(loggers.data)
                getLoggers()
                // console.log(loggers.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    useEffect(() =>{
        getLoggers()
    },[])

    return(
    <div className='table'>
        <table className='center-table'>
          <thead>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Suhu</th>
          </thead>
          <tbody>
            {
                loggers.length !== 0?
                loggers.map(logger=>{
                    return(
                        <tr>
                            {/* <th>{logger.id}</th> */}
                            <th>{logger.tanggal}</th>
                            <th>{logger.waktu} WIB</th>
                            <th>{logger.suhu} &deg;C</th>
                        </tr>
                    )
                }):
                <p>Tidak ada pembacaan data</p>
            }
          </tbody>
        </table>
    </div>
    );

}


export default Table;