"use client"
// import Image from "next/image";
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Navbar from '@/components/Navbar';


export default function SketchToCode() {
  let [response, setResponse] = useState("");
  let [filename, setFilename] = useState("");
  let [file, setFile] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
    setFilename(acceptedFiles[0].name)
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const handleSubmit = async function(event) {
    event.preventDefault()

    let formData = new FormData()
    formData.append("file", file)
    setResponse("")
    setLoading(true)
    try {
      let res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
      })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setResponse(data)
      }
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col justify-center items-center gap-12 min-h-screen bg-gradient-to-r from-indigo-900 to-black p-4'>
      <Navbar/>
      {
        loading && <div className="w-16 h-16 border-t-2 border-l-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin my-auto"></div>
      }
      {
        response && 
        <section className='bg-zinc-700 text-white p-8 h-auto w-[80vw] rounded-lg'>
          <pre className='bg-teal-950 p-2 w-full overflow-x-auto'>{response}</pre>
          <button 
              className="bg-blue-500 text-white p-2 rounded-md m-auto hover:bg-blue-600 mt-4"
              onClick={handleCopy}
            >
              Copy
            </button>
        </section> 
      }
      {
        error && 
        <section className='bg-zinc-950 text-red-500 p-4 h-auto w-1/2'>
          <pre className='bg-teal-950 p-2 h-auto w-full overflow-x-auto'>{error}</pre>
        </section> 
      }
      <div  className='mt-auto border-2 bg-gray-300 h-[20vh] md:w-1/2 w-[90vw] md:text-2xl text-black p-4 flex flex-col justify-between items-center fixed bottom-0 mb-8'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a file here, or click to select file</p>
          <p className='text-gray-600 text-center'>{filename}</p>
        </div>
        <button onClick={handleSubmit} className='bg-violet-800 text-white tracking-wide p-2 rounded-lg hover:bg-blue-500' disabled={loading}>Generate</button>
      </div>
    </div>
  )
}