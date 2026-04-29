"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-[420px] p-8 md:p-10 border border-gray-200">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Forgot Password</h1>
          {/* Screenshot mein copy-paste error thi, maine logical subtitle daal diya hai */}
          <p className="text-gray-500 text-[13px]">Enter your email address to receive a password reset link.</p>
        </div>

        <form>
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[14px] text-gray-800 focus:ring-1 focus:ring-[#1abc60] focus:border-[#1abc60] outline-none placeholder:text-gray-400 font-medium"
              placeholder="name@example.com"
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#1abc60] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#169c4e] transition-all flex items-center justify-center gap-2 mb-6">
            Send Reset Link <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 text-[11px] font-bold text-[#1abc60] hover:text-[#169c4e] uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </form>
        
      </div>
    </div>
  );
}