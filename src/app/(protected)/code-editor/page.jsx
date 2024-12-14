"use client";

import dynamic from 'next/dynamic'

const Editor = dynamic(()=>import("@monaco-editor/react"), {
  ssr: false
})

import useUserContext from '@/lib/user/userContext';
import { useState , useRef } from 'react';
import Navbar from '@/components/Navbar';
import Select from 'react-select';
import SigninForm from '@/app/(auth)/signin/page';
import axios from 'axios';

export default function CodeEditor() {
  let {user} = useUserContext();

  let editorRef = useRef();

  let options = [
    { value: 'javascript', label: 'javascript', version: "18.15.0" },
    { value: 'typescript', label: 'typescript', version: "5.0.3" },
    { value: 'python', label: 'python', version: "3.10.0" },
    { value: 'java', label: 'java', version: "15.0.2" },
    { value: 'c++', label: 'c++', version: "10.2.0" },
    { value: 'csharp', label: 'csharp', version: "6.12.0" },
    { value: 'php', label: 'php', version: "8.2.3" },
  ];

  let [code, setCode] = useState("console.log('Hello World');");
  const [lang, setLang] = useState({ value: 'javascript', label: 'javascript', version: "18.15.0" });
  let [sendcode, setSendcode] = useState({
    language: lang.value,
    version: lang.version,
    files: [{
      content: ""
    }]
  });
  let [output, setOutput] = useState("");
  let [load, setLoad] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    editor.focus();
  }

  const handleChange = function(str) {
    setCode(str)
  }

  const handleRun = async function () {
    setSendcode({
      language: lang.value,
      version: lang.version,
      files: [{
        content: code
      }]
    })
    setLoad(true);
    try {
      let res = await axios.post("https://emkc.org/api/v2/piston/execute", sendcode)
      console.log(res.data)
      if (res.data) setOutput(res.data.run.output);
    } catch (error) {
      console.log(error)
    }
    setLoad(false)
  }

  console.log(user.email)

  if (!user.email) {
    return (
      <div className="w-full h-screen text-white bg-gray-100">
        <SigninForm/>
      </div>
    )
  }

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
              theme='vs-dark'
              language={lang.value}
              value={code}
              onChange={handleChange}
              onMount={handleEditorDidMount}
          />
          {
            load && <div className="w-16 h-16 border-t-2 border-l-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin my-auto"></div>
          }
          <button 
            className='bg-green-600 w-[15vw] rounded-lg p-2' 
            onClick={handleRun}
          >
            Run
          </button>

          <div className='w-[80vw] h-auto bg-black text-white overflow-x-auto p-4'>
            <pre>
              {output}
            </pre>
          </div>

        </div>
    );
}