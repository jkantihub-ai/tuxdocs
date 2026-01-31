
import React from 'react';
import { TUX_LOGO } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-50 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-500/10">
            {TUX_LOGO('w-20 h-20 text-orange-500')}
          </div>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
          About <span className="text-orange-500">TuxDocs</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The next evolution of The Linux Documentation Project, built for the modern era with AI intelligence and a focus on accessibility.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-xl font-black text-slate-900">PWA Optimized</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            TuxDocs is a Progressive Web App. Install it on your home screen for a native experience, even when offline. It's fast, reliable, and uses modern browser capabilities to work seamlessly on iOS, Android, and Desktop.
          </p>
        </div>

        <div className="p-8 rounded-[3rem] bg-white border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13V4" /></svg>
          </div>
          <h3 className="text-xl font-black text-slate-900">AI Intelligence</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Powered by Google Gemini, our platform provides natural language search, automated document summaries, and an interactive virtual terminal to test commands safely before execution.
          </p>
        </div>
      </div>

      <section className="p-10 rounded-[3.5rem] bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 blur-[100px]"></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Our Mission</h2>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            For decades, TLDP has been the backbone of Linux knowledge. TuxDocs aims to preserve this heritage while making it more interactive. We believe that learning Linux should be as smooth as running a well-tuned kernel.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Open Source</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Community Moderated</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-10">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Built with 🐧 in the cloud</p>
      </footer>
    </div>
  );
};

export default About;
