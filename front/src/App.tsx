import React, { useState } from 'react';
import './App.css';
import Levels from './components/Levels'
import HandleLevels from './components/HandleLevels'
import Level from './components/Level'
import { LevelContext } from './contexts/contexts'

function App() {

  const [level, setLevel] = useState({id: -1, end_code: "end_code", start_code: "start_code", creator:"creator", name: "test"})
  const [user] = useState(`guest_${Math.floor(Math.random() * 100000)}`)

  return (
    <div className="App">
      <LevelContext.Provider value={{level, setLevel}}>
        {
          level.id === -1 ?
            <div className="justify-space-around padding full-width flex flex-column full-height align-center">
              <Levels />
              <HandleLevels user={user} />
            </div>
            :
            <>
              <Level />
            </>
        }
      </LevelContext.Provider>
    </div>
  );
}

export default App;
