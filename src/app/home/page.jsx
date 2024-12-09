'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaFileUpload } from "react-icons/fa";

const PromptPage = () => {
  let [prompt, setPrompt] = useState('');
  let [image, setImage] = useState(null);
  let [response, setResponse] = useState('');
  // let [lang, setLang] = useState('');
  let [code, setCode] = useState('');
  let [steps, setSteps] = useState('');
  let [note, setNote] = useState('');
  let [error, setError] = useState('');
  let [load, setLoad] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse('');
    setCode('');
    setNote('');
    setSteps('');
    setLoad(true);
    try {
      const res = await axios.post('http://localhost:8000/users/chat', {prompt});
      if (res.data.success) {
        console.log(res.data)
        setResponse(res.data);
        setCode(res.data.Code.split("\n"))
        setSteps(res.data.Explanation.split("\n"))
        setNote(res.data.Note.split("\n"))
      }
      else setError("Sorry no response at the moment")
      setPrompt("")
    } catch (err) {
      console.log(`Error message : ${err.message}`);
    }
    setLoad(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8 gap-8">
      {
        load && <div className="w-16 h-16 border-t-2 border-l-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin my-auto"></div>
      }
      <div className="flex flex-col justify-center items-center space-y-8">
        {code && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded w-1/2 h-auto overflow-x-auto">
            <h3 className="text-2xl font-bold">Code:</h3><br/>
            <div>
              {
                code.map((item, index)=>{
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
          </div>
        )}
        {steps && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded w-1/2 h-auto">
            <h3 className="text-2xl font-bold">Explanation:</h3><br/>
            <div>
              {
                steps.map((item, index)=>{
                  return (
                    <div key={index}>
                    {item}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
        {note && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded w-1/2 h-auto">
            <h3 className="text-2xl font-bold">Note*:</h3><br/>
            <div>
              {
                note.map((item, index)=>{
                  return (
                    <div key={index}>
                    {item}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl px-8 py-4 bg-gray-800 rounded-2xl shadow-md mt-auto"> 
	      <div className="flex items-center space-x-2"> 
          <textarea 
              className="flex-grow text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 			  
              placeholder="Type your message here..." 
              rows="1" 
              value={prompt} 
              onChange={handlePromptChange} 
          />
          <label htmlFor="image-upload" className="flex items-center justify-center p-3 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" > 
            {/* <i className="fas fa-image text-gray-500 hover:text-gray-700"></i>  */}
            <FaFileUpload />
            <input 
                  id="image-upload" 
                  type="file" 
                  accept='image/*'
                  className="hidden" 
                  onChange={handleImageChange} 
            /> 
          </label> 
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" 
            onClick={handleSubmit} 
          > Send 
          </button> 
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
