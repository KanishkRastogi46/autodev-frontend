'use client';

import { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import useUserContext from '@/lib/user/userContext';
import SigninForm from '../(auth)/signin/page';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const PromptPage = () => {
  let {user, setUser} = useUserContext();

  let fetchUser = async () => {
    try {
      let res = await axios.get("http://localhost:8000/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        }
      })
      if (res.data.email.trim() !== "") setUser(res.data)
      else router.push("/signin")
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  let divRef = useRef();
  let router = useRouter();

  let [prompt, setPrompt] = useState('');
  let [response, setResponse] = useState('');
  let [lang, setLang] = useState('');
  let [code, setCode] = useState('');
  let [steps, setSteps] = useState('');
  let [note, setNote] = useState('');
  let [error, setError] = useState('');
  let [load, setLoad] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleCopy = function () {
    const str = code.join("\n");
    console.log(str);
    window.navigator.clipboard.writeText(str).then(()=>console.log("copied"))
  }

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

  // console.log(user)

  if (user.email === "") {
    return (
      <div className="w-full h-screen text-white bg-gray-100">
        <SigninForm/>
      </div>
    )
    // router.push("/signin")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-black p-8 gap-8">
      <Navbar/>
      {
        load && <div className="w-16 h-16 border-t-2 border-l-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin my-auto"></div>
      }
      <div className="flex flex-col justify-center items-center space-y-8 mt-16">
        {code && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded md:w-1/2 w-[90vw] h-auto overflow-x-auto">
            <h3 className="text-2xl font-bold">Code:</h3><br/>
            <div ref={divRef} className='bg-neutral-800 p-2 rounded-lg overflow-x-auto'>
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
            <button 
              className="bg-blue-500 text-white p-2 rounded-md m-auto hover:bg-blue-600 mt-4"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        )}
        {steps && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded-md md:w-1/2 w-[90vw] h-auto">
            <h3 className="text-2xl font-bold">Explanation:</h3><br/>
            <div className='bg-neutral-800 p-2 rounded-lg'>
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
          <div className="mt-4 p-4 bg-gray-700 text-white rounded-md md:w-1/2 w-[90vw] h-auto">
            <h3 className="text-2xl font-bold">Note*:</h3><br/>
            <div className='bg-neutral-800 p-2 rounded-lg'>
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
      <div className="w-full max-w-2xl px-4 md:px-8 py-4 bg-gray-800 rounded-2xl shadow-md mt-auto fixed bottom-0 mb-4 md:mb-8">
        <div className="flex flex-col w-full md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2"> 
          <textarea 
            className="flex-grow w-full text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Type your message here..." 
            rows="1" 
            value={prompt} 
            onChange={handlePromptChange} 
          /> 
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-2 md:mt-0" 
            onClick={handleSubmit} 
            disabled={load} 
          > 
            Send 
          </button> 
        </div> 
      </div>
    </div>
  );
};

export default PromptPage;