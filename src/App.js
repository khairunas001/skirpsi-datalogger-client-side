import React from 'react';
import './App.css';
import Form from './components/input'
import Table from './components/tabel';
import Grafik from './components/grafik';

function App() {
  return (
    <div className="App">
      <div className='judul'>
        <h1>Pengembangan Data Logger pada Interfacing Kontroller Temperature</h1>
      </div>
      <Grafik></Grafik>
      <Form></Form>
      <Table></Table>
    </div>

  );
}

export default App;
