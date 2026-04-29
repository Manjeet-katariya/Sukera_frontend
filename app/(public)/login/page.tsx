"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.01 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.83 2.32-3.18 1.94-2.64 6.32.48 7.62-.7 1.83-1.83 3.6-2.96 4.71v-.01zm-3.08-16.7c-.12-1.95 1.4-3.64 3.25-3.79.25 2.12-1.63 3.8-3.25 3.79z"/></svg>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // FIX: Main background is off-white (#f8f9fa)
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
      
      {/* FIX: Form background is pure white with a border */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-[420px] p-8 md:p-10 border border-gray-200">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 text-[13px]">Sign in to manage your bookings and leagues.</p>
        </div>

        <form>
          <div className="mb-5">
            <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[14px] text-gray-800 focus:ring-1 focus:ring-[#1abc60] focus:border-[#1abc60] outline-none placeholder:text-gray-400 font-medium"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider">Password</label>
              <Link href="/ForgotPassword" className="text-[11px] font-bold text-[#1abc60] hover:text-[#169c4e]">Forgot password?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[14px] text-gray-800 focus:ring-1 focus:ring-[#1abc60] focus:border-[#1abc60] outline-none placeholder:text-gray-400 font-medium"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-[#1abc60] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#169c4e] transition-all flex items-center justify-center gap-2 mb-6">
            Login <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-4 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Or Continue With</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 py-3 rounded-xl transition-all text-[12px] font-bold text-gray-700">
              Google <GoogleIcon />
            </button>
            <button type="button" className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 py-3 rounded-xl transition-all text-[12px] font-bold text-gray-700">
              Apple <AppleIcon />
            </button>
          </div>

          <p className="text-center text-[13px] text-gray-500 font-medium">
            Don't have an account? <Link href="/Signup" className="text-[#1abc60] font-bold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}