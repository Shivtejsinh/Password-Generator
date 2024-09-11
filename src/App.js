import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [length, setLengtht] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const coppyText0nClipBord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+}{?><";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator]);
  return (
    <div className="width-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  bg-gray-800 text-orange-500 my-3 mt-9">
      <h1 className="text-4xl text-white text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          className="outline-none w-full py-1 px-3"
          ref={passwordRef}
        />
        <button
          className="bg-blue-400 outline-none text-white px-3 py-0.5 shrink-0"
          onClick={coppyText0nClipBord}
        >
          Coppy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex text-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            className="cursor-pointer"
            onChange={(e) => {
              setLengtht(e.target.value);
            }}
          />
          <lable>Length:{length}</lable>

          <input
            type="checkbox"
            defaultChecked={numAllowed}
            min={8}
            max={100}
            // className="cursor-pointer"
            onChange={(e) => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <lable>Number:{numAllowed}</lable>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            min={8}
            max={100}
            // className="cursor-pointer"
            onChange={(e) => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <lable>Character:{charAllowed}</lable>
        </div>
      </div>
    </div>
  );
}

export default App;
