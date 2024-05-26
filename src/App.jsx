import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // State variables for password length, number inclusion, special character inclusion, and the generated password
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Function to generate the password based on current settings
  const generatePassword = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    // Append numbers and special characters to the string if allowed
    if (numberAllowed) string += "0123456789";
    if (characterAllowed) string += "!@#$%^&*()_+";
    
    // Generate a random password of the specified length
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      password += string.charAt(char);
    }
    
    // Update the password state with the newly generated password
    setPassword(password);
  }, [length, numberAllowed, characterAllowed]);

  // useEffect to generate a new password whenever the dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  //useRef hook
  const passwordRef = useRef(null);

  // Function to copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99);
    document.execCommand("copy");
    alert("Password copied to clipboard");

  },
  [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-500 bg-slate-400">
        <h1 className="text-white text-center">Password Generator</h1>
        
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Generate Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={generatePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 shrink-0 outline-none"
          >
            Generate
          </button>
        </div>
        
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 shrink-0 outline-none mb-4"
        >
          Copy
        </button>
        
        <div className="flex flex-col text-sm gap-y-2">
          <div className="flex items-center gap-x-1">
            <label className="text-white">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
