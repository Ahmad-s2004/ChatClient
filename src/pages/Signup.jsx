import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { useFormik } from 'formik'
import { z } from 'zod'
import { signUp } from '../api'

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = signupSchema.safeParse(values);
      if (result.success) return {}; 
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    },
    onSubmit: async (values) => {
      setServerError("");
      try {
        const { data } = await signUp(values);
        localStorage.setItem('profile', JSON.stringify(data));
        navigate('/');
      } catch (err) {
        setServerError(err.response?.data?.message || "Signup failed. Try again!");
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-between items-center font-sans text-gray-400 overflow-hidden">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="relative w-full max-w-[420px] p-8 bg-[#1e1e1e] rounded-[32px] border border-gray-800 shadow-2xl animate-in fade-in zoom-in duration-300">

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-emerald-500/20">P</div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-sm text-gray-500">Join the Ping community today</p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            
            <div className="relative group">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formik.touched.name && formik.errors.name ? 'text-red-500' : 'text-gray-500 group-focus-within:text-emerald-500'}`}>
                <User size={20} />
              </div>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                {...formik.getFieldProps('name')}
                className={`w-full h-11 pl-12 pr-4 bg-[#252525] border rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 ${formik.touched.name && formik.errors.name ? 'border-red-500/50' : 'border-gray-800 focus:border-emerald-500/50 focus:ring-emerald-500/20'} text-white`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-[10px] text-red-500 mt-1 ml-2 absolute font-medium">{formik.errors.name}</p>
              )}
            </div>

            <div className="relative group">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-emerald-500'}`}>
                <Mail size={20} />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                {...formik.getFieldProps('email')}
                className={`w-full h-11 pl-12 pr-4 bg-[#252525] border rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 ${formik.touched.email && formik.errors.email ? 'border-red-500/50' : 'border-gray-800 focus:border-emerald-500/50 focus:ring-emerald-500/20'} text-white`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[10px] text-red-500 mt-1 ml-2 absolute font-medium">{formik.errors.email}</p>
              )}
            </div>

            <div className="relative group">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formik.touched.password && formik.errors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-emerald-500'}`}>
                <Lock size={20} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps('password')}
                className={`w-full h-11 pl-12 pr-12 bg-[#252525] border rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 ${formik.touched.password && formik.errors.password ? 'border-red-500/50' : 'border-gray-800 focus:border-emerald-500/50 focus:ring-emerald-500/20'} text-white`}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                type="button" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-[10px] text-red-500 mt-1 ml-2 absolute font-medium">{formik.errors.password}</p>
              )}
            </div>

            {serverError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl text-center mt-4">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-11 mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Creating Account..." : "Sign Up"}
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
      
    </div>
  );
};

export default Signup;