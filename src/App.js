import React from 'react';
import Clock from './components/clock';
import Table from './components/table';
import Controls from './components/controls';
import { LogProvider } from './lib/contexts/LogContext';
import generateUid from './lib/utils/generateUid';

function App() {
  return (
    <>
      <p>Your user id: {generateUid()}</p>
      <button onClick={() => console.log('Doing nothing (yet)')}>
        Sync to server
      </button>
      <hr />
      <Clock />
      <LogProvider>
        <Table />
        <Controls />
      </LogProvider>
    </>
  );
}

export default App;
