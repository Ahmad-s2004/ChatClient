import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Signin = () => {
  const [password, setPassword] = useState(false)
  return (
    <div className="min-h-screen bg-[#111216] flex flex-col justify-between font-sans text-[#aab3c0] overflow-hidden">
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="relative w-full max-w-[450px] p-10 bg-[#1c1f26]/60 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back!</h1>
            {/* <p className="text-sm text-gray-400">Sign in to access Movie Reviews & Team Spaces.</p> */}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-4 bg-[#282c34] border border-transparent focus:border-purple-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                type={password?"text":"password"}
                placeholder="Password"
                className="w-full h-14 pl-12 pr-12 bg-[#282c34] border border-transparent focus:border-purple-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-500"
              />
              <button onClick={()=>setPassword(!password)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-4 bg-gradient-to-r from-[#7c4dff] via-[#1d4937] to-[#7c4dff] text-white font-semibold rounded-4xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-black/20"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-3 text-xs">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Forgot Password?</a>
            <p className="text-gray-500">
              Don't have an account? <Link to="/signup" className="text-[#5ef093] font-bold hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full px-8 py-4 flex justify-between items-center text-[11px] text-gray-500 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span className="font-medium">10:09 AM</span>
          <div className="flex gap-2 opacity-60 text-gray-400">
             <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>
             <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>
          </div>
        </div>
        <div className="flex items-center gap-3 opacity-60">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 11.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c.203.196.359.4.453.619l.762 1.769A.5.5 0 0 1 12.93 13H3.07a.5.5 0 0 1-.46-.302l.762-1.77a1.232 1.232 0 0 0 .453-.618A5.984 5.984 0 0 1 2 6z"/></svg>
        </div>
      </footer>
    </div>
  );
};

export default Signin;