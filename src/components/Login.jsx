import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constants';


const Login = () => {
    

    const[emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const[error,setError]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleLogin = async () => {
        try {
          const res = await axios.post(
            BASE_URL+"/login",
            {
              emailId,
              password,
            },
            { withCredentials: true }
          );
          dispatch(addUser(res.data));
          return navigate("/");
        } catch (err) {
          setError(err?.response?.data || "Something went wrong");
        }
      };

  return (
    <div className="flex justify-center m-10">
        
      <div className="card bg-primary text-primary-content w-96  shadow-amber-xl align-middle">
        <div className="card-body">
        <h1 className='justify-center mx-32 text-2xl font-bold '>login</h1>

          {/* Email Field */}
          <div className="m-2">
            <label htmlFor="email" className="block mb-1 font-semibold">Email:</label>
            <label className="input validator flex items-center gap-2">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="mail@gmail.com"
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">Enter valid email address</div>
          </div>

          {/* Password Field */}
          <div className="m-1">
            <label htmlFor="password" className="block mb-1 font-semibold">Password:</label>
            <label className="input validator flex items-center gap-2">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn" onClick={ handleLogin }>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
