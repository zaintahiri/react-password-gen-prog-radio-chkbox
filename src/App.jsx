import { useState } from 'react'
import './App.css'
import { useCallback,useEffect,useRef } from 'react';

// WE HAVE USED useCallback, useEffect, useRef
function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //useRef hook
  const passwordRef=useRef(null);

  const passwordGeneration=useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+";

    let newPassword = "";
    for (let i = 1; i <= length; i++) {
      newPassword += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(newPassword);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard=useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,4);
      window.navigator.clipboard.writeText(password);
      //alert("password copied"+passwordRef.current.value);
  },[password]);

  useEffect(()=>{
      passwordGeneration()
  },[length,numberAllowed,charAllowed,passwordGeneration])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
                      text-orange-500 bg-gray-800 px-4 py-3 my-8'>
                      <h1 className='text-white text-center'>Password generation</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 my-3'>
              <input type='text' 
                  placeholder='Password' 
                  value={password}
                    className='outline-none w-full py-1 px-3 bg-white'
                    readOnly
                    ref={passwordRef}
                  />
                <button
                    onClick={copyPasswordToClipboard} 
                    className='outline-none bg-blue-500 px-3 py-0.5 text-white shrink-0'>Copy</button>
          </div>

          <div className='flex gap-x-2 text-sm'>
              <div className='flex items-center gap-x-1'>
                  <input type='range'
                          min={8}
                          max={100}
                          value={length}
                          className='cursor-pointer accent-blue-500'
                          onChange={(e)=>{setLength(e.target.value)}}
                          />
                  <label>Length : {length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type='checkbox' 
                        defaultChecked={numberAllowed}
                        onChange={()=>{
                          setnumberAllowed((prev)=>!prev);
                        }} />
                <label>Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type='checkbox' 
                        defaultChecked={charAllowed}
                        onChange={()=>{
                          setCharAllowed((prev)=>!prev);
                        }} />
                  <label>Characters</label>
              </div>
          </div>
          
      </div>
    </>
  )
}

export default App
