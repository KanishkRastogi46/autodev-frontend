'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useUserContext from '@/lib/user/userContext';

function SigninForm() {

  let {setUser} = useUserContext()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  let router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      setError('All fields are required and cannot contain only whitespace.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/token`, formData);
      console.log('Signin successful:', response.data);
      if (response.data.success) {
        localStorage.setItem("accesstoken", response.data.access_token)
        localStorage.setItem("user", response.data.user)
        setUser(response.data.user)
        router.push("/prompt-page")
      }
      // Additional actions after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle the error, such as displaying an error message
      setError('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md space-y-6 sm:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold text-center">Signin</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
              {showPassword ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.99 10.99 0 0112 19c-5.523 0-10-4.477-10-10 0-1.042.163-2.04.464-2.987m7.338 11.947A9.943 9.943 0 0112 17c5.523 0 10-4.477 10-10 0-1.053-.168-2.065-.48-3.035M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.737 5 12 5c4.263 0 8.268 2.943 9.542 7-1.274 4.057-5.279 7-9.542 7-4.263 0-8.268-2.943-9.542-7z"></path>
                </svg>
              )}
            </button>
          </div>
          
          <div>
            <button type="submit" className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? (
                <svg className="w-5 h-5 mx-auto text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
