"use client"

import useUserContext from '@/lib/user/userContext';
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Navbar from '@/components/Navbar';
import SigninForm from '@/app/(auth)/signin/page';

export default function SketchToCode() {
  let {user} = useUserContext();

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
      let res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
        },
        body: formData
      })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        setResponse(data.split("\n"))
      }
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
    setLoading(false)
  }

  const handleCopy = function () {
    window.navigator.clipboard.writeText(response.join("\n")).then(()=>console.log("copied")).catch(err=>console.log(err))
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
    <div className='flex flex-col justify-center items-center gap-12 min-h-screen bg-gradient-to-r from-indigo-700 via-black to-indigo-700 p-4'>
      <Navbar/>
      {
        loading && <div className="w-16 h-16 border-t-2 border-l-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin my-auto"></div>
      }
      {
        response && 
        <div className="mt-4 p-4 bg-gray-700 text-white rounded md:w-1/2 w-[90vw] h-auto overflow-x-auto">
          <h3 className="text-2xl font-bold">Response:</h3><br/>
          <div className='bg-neutral-800 p-2 rounded-lg overflow-x-auto'>
            {
              response.map((item, index)=>{
                return (
                  <code key={index}>
                    <pre>
                      {item}
                    </pre>
                  </code>
                )
              })
            }
          </div>
          <button 
            className="bg-blue-500 text-white p-2 rounded-md m-auto hover:bg-blue-600 mt-4"
            onClick={handleCopy}
          >
            Copy
          </button>
      </div> 
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