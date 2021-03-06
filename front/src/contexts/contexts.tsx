import React, { createContext } from 'react';
import { Level } from '../types';

const setLevelFunc = (newConsole: Level) => newConsole;
const setUsernameFunc = (newConsole: string) => newConsole;
const levelExample: Level = {
    endcode: "endcode",
    startcode: "startcode",
    creator: "creator",
    id: -1,
    name: "test"
}

export const LevelContext = createContext<{
    level: Level;
    setLevel: (newView: Level) => void;
}>({ level: levelExample, setLevel: setLevelFunc });


export const UsernameContext = createContext<{ username: string, setUsername: (username: string) => void }>({
    username: "",
    setUsername: setUsernameFunc
});