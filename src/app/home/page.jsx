'use client';

import { useState } from 'react';
import axios from 'axios';

const PromptPage = () => {
  let [prompt, setPrompt] = useState('');
  let [image, setImage] = useState(null);
  let [response, setResponse] = useState([]);
  let [show, setShow] = useState(``);
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

    try {
      const res = await axios.post('http://localhost:5000/users/chat', {prompt});
      if (res.data.success) {
        setResponse(res.data.message.split("\n"));
      }
      else setError("Sorry no response at the moment")
      
    } catch (err) {
      console.log(`Error message : ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
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
        {response && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            <h3 className="text-lg font-semibold">Response:</h3>
            <div>
              {
                response.map((item, index)=>{
                  return (
                    <>
                      <dir key={index}>
                        {item}
                      </dir>
                    </>
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
