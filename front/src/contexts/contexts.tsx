import React, { createContext } from 'react';
import { Level } from '../types';

const setLevelFunc = (newConsole: Level) => newConsole;
const levelExample: Level = {
    end_code: "end_code",
    start_code: "start_code",
    creator: "creator",
    id: -1
}

export const LevelContext = createContext<{
    level: Level;
    setLevel: (newView: Level) => void;
}>({ level: levelExample, setLevel: setLevelFunc });