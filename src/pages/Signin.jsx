import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { useFormik } from 'formik'
import { z } from 'zod'
import { signIn } from '../api'

const signinSchema = z.object({
  email: z.string().email("Sahi email likhen"),
  password: z.string().min(1, "Password zaroori hai"),
});

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const result = signinSchema.safeParse(values);
      if (!result.success) {
        const errors = {};
        result.error.issues.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        return errors;
      }
      return {};
    },
    onSubmit: async (values) => {
      setServerError("");
      try {
        const { data } = await signIn(values);
        localStorage.setItem('profile', JSON.stringify(data));
        navigate('/');
      } catch (err) {
        setServerError(err.response?.data?.message || "Login fail hogaya!");
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-between items-center font-sans text-gray-400 overflow-hidden">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="relative w-full max-w-[420px] p-8 bg-[#1e1e1e] rounded-[32px] border border-gray-800 shadow-2xl">
          
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-emerald-500/20">P</div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-sm text-gray-500">Sign in to continue to Ping</p>
          </div>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            
            {serverError && (
              <p className="text-red-500 text-[11px] text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{serverError}</p>
            )}

            <div className="relative group">
            <div className={`absolute left-4 top-[22px] -translate-y-1/2 transition-colors ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-emerald-500'}`}>
                <Mail size={20} />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                {...formik.getFieldProps('email')}
                className={`w-full h-11 pl-12 pr-4 bg-[#252525] border ${formik.touched.email && formik.errors.email ? 'border-red-500/50' : 'border-gray-800'} focus:border-emerald-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-emerald-500/20`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="absolute -bottom-4 left-2 text-red-500 text-[10px] font-medium leading-none">{formik.errors.email}</p>
              )}
            </div>

            <div className="relative group">
            <div className={`absolute left-4 top-[22px] -translate-y-1/2 transition-colors ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-emerald-500'}`}>
                <Lock size={20} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps('password')}
                className={`w-full h-11 pl-12 pr-12 bg-[#252525] border ${formik.touched.password && formik.errors.password ? 'border-red-500/50' : 'border-gray-800'} focus:border-emerald-500/50 text-white rounded-2xl outline-none transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-emerald-500/20`}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)} 
                type="button" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="absolute -bottom-4 left-2 text-red-500 text-[10px] font-medium leading-none">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex justify-end px-1">
              <a href="#" className="text-xs text-gray-500 hover:text-emerald-500 transition-colors">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-11 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              New to Ping? <Link to="/signup" className="text-emerald-500 font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;