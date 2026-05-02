import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-between font-sans text-gray-400 overflow-hidden">
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="relative w-full max-w-[420px] p-8 bg-[#1e1e1e] rounded-[32px] border border-gray-800 shadow-2xl animate-in fade-in zoom-in duration-300">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              P
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-sm text-gray-500">Join the Ping community today</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-14 pl-12 pr-4 bg-[#252525] border border-gray-800 focus:border-emerald-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 pl-12 pr-4 bg-[#252525] border border-gray-800 focus:border-emerald-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-14 pl-12 pr-12 bg-[#252525] border border-gray-800 focus:border-emerald-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-emerald-500/20"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                type="button" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-14 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
            >
              Sign Up
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              Already have an account? <Link to="/signin" className="text-emerald-500 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full px-8 py-6 flex justify-between items-center text-[11px] text-gray-600 border-t border-gray-800/50">
        <div className="flex items-center gap-4">
          <span className="font-medium tracking-widest uppercase">Ping Secure</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
};

export default Signup;