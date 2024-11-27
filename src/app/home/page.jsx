'use client';

import { useState } from 'react';
import axios from 'axios';

const PromptPage = () => {
  let [prompt, setPrompt] = useState('');
  let [image, setImage] = useState(null);
  let [response, setResponse] = useState('');
  // let [lang, setLang] = useState('');
  let [code, setCode] = useState('');
  let [steps, setSteps] = useState('');
  let [note, setNote] = useState('');
  let [error, setError] = useState('');

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

    try {
      const res = await axios.post('http://localhost:5000/users/chat', {prompt});
      if (res.data.success) {
        console.log(res.data.message)
        setResponse(res.data.message);
        setCode(res.data.message.Code.split("\n"))
        setSteps(res.data.message.Explanation.split("\n"))
        setNote(res.data.message.Note.split("\n"))
      }
      else setError("Sorry no response at the moment")
      
    } catch (err) {
      console.log(`Error message : ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8 gap-8">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Send a Prompt</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="prompt">
              Prompt
            </label>
            <textarea
              className="text-black w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={handlePromptChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="image">
              Upload Image
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
      <div className="flex justify-around space-x-4 flex-wrap">
        {code && (
          <div className="mt-4 p-4 bg-orange-700 text-white rounded w-[33vw] h-[40vh] overflow-auto">
            <h3 className="text-2xl font-bold">Code:</h3><br/>
            <div>
              {
                code.map((item, index)=>{
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
        {steps && (
          <div className="mt-4 p-4 bg-orange-600 text-white rounded w-[33vw] h-[40vh] overflow-auto">
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
          <div className="mt-4 p-4 bg-orange-500 text-white rounded w-[33vw] h-[40vh] overflow-auto">
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
    </div>
  );
};

export default PromptPage;
