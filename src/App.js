// import React from 'react';
// import './App.css';
// import Form from './components/input'
// import Table from './components/tabel';
// import Grafik from './components/grafik';

// function App() {
//   return (
//     <div className="App">
//       <div className='judul'>
//         <h1>Pengembangan Data Logger pada Interfacing Kontroller Temperature</h1>
//       </div>
//       <div>
//         <Form></Form>
//       </div>
//       <div className='grafik'>
//         <Grafik></Grafik>
//       </div>
//       <div className='tabel'>
//         <Table></Table>
//       </div>
//     </div>

//   );
// }

// export default App;

import React, { useState } from 'react';
import Form from './components/input';
import Table from './components/tabel';
import Grafik from './components/grafik';
import './App.css';

function App() {
  const [view, setView] = useState('table'); // Default tampilan adalah table

  const renderView = () => {
    switch(view) {
      case 'table':
        return <Table />;
      case 'grafik':
        return (
        <div>
          <div className='grafikOnly'>
              <Grafik></Grafik>
          </div>
        </div>
        );
      case 'both':
        return (
          <div className='bothContainer'>
            <div className='grafik'>
              <Grafik></Grafik>
            </div>
            <div className='tabel'>
              <Table></Table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className='judul'>
        <h1>Pengembangan Data Logger pada Interfacing Kontroller Temperature</h1>
      </div>
      <div>
        <Form />
      </div>
      <div className="navbar">
        <button onClick={() => setView('table')}>Table</button>
        <button onClick={() => setView('grafik')}>Grafik</button>
        <button onClick={() => setView('both')}>Grafik & Table</button>
      </div>
      <div className='content'>
        {renderView()}
      </div>
    </div>
  );
}

export default App;
