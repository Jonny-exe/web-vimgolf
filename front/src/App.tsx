import React, { useState } from 'react';
import './App.css';
import Levels from './components/Levels'
import Level from './components/Level'
import { LevelContext } from './contexts/contexts'

function App() {

  const [level, setLevel] = useState({id: -1, end_code: "end_code", start_code: "start_code", creator:"creator"})

  return (
    <div className="App">
      <LevelContext.Provider value={{level, setLevel}}>
        {
          level.id === -1 ?
            <>
              <Levels />
            </>
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
