"use client";

import Editor from '@monaco-editor/react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Select from 'react-select';

const options = [
  { value: 'javascript', label: 'javascript' },
  { value: 'typescript', label: 'typescript' },
  { value: 'python', label: 'python' },
  { value: 'java', label: 'java' },
  { value: 'cpp', label: 'cpp' },
  { value: 'php', label: 'php' },
];

export default function CodeEditor() {
  let [code, setCode] = useState("console.log('Hello World');");
  const [lang, setLang] = useState("javascript");
  let [sendcode, setSendcode] = useState({
    filename: `index.js`,
    language: lang,
    code
  })
  
  const handleChange = function(str) {
    setCode(str)
  }

  const handleRun = function () {

  }
//   console.log(lang)
  return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-black p-8 gap-8'>
            <Navbar/>
            <h1 className='font-light text-white text-3xl text-center capitalize tracking-wide mt-20'>Try the Code here</h1>
            <Select
                defaultValue={lang}
                onChange={setLang}
                options={options}
                className='text-black'
            />
            <Editor 
                className=''
                height="80vh" 
                width={"80vw"}
                theme='light'
                defaultLanguage="javascript" 
                language={lang}
                defaultValue="// some comment" 
                value={code}
                onChange={handleChange}
            />
            <button className='bg-green-600 w-[15vw] rounded-lg p-2' onClick={handleRun}>Run</button>
            <div id="result">
                {""}
            </div>
        </div>
    );
}