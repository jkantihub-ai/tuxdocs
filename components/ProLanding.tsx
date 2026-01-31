
import React from 'react';
import { TUX_LOGO } from '../constants';

interface ProLandingProps {
  isPro: boolean;
  onUpgrade: () => void;
}

const ProLanding: React.FC<ProLandingProps> = ({ isPro, onUpgrade }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-6 pro-gradient rounded-[3rem] shadow-2xl shadow-purple-500/20">
            {TUX_LOGO('w-20 h-20 text-white')}
          </div>
        </div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
          Tux<span className="text-purple-600">Pro</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Unlock the full power of Gemini AI within the Linux Documentation Project ecosystem.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'AI Librarian', 
            desc: 'Natural language search that understands technical context.',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z'
          },
          { 
            title: 'Virtual Shell', 
            desc: 'A simulated terminal to test commands safely using Gemini Pro.',
            icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          },
          { 
            title: 'Article Insights', 
            desc: 'Automated summaries and pro tips for every guide.',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13V4'
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} /></svg>
            </div>
            <h3 className="text-lg font-black text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-12 rounded-[4rem] pro-gradient text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black">Ready to level up?</h2>
          <p className="text-purple-100 text-lg font-medium">Activate Tux Pro to enable AI assistance across the platform.</p>
          <div className="pt-6">
            <button 
              onClick={onUpgrade}
              disabled={isPro}
              className={`px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl ${isPro ? 'bg-white/20 cursor-default' : 'bg-white text-purple-600 hover:scale-105 active:scale-95'}`}
            >
              {isPro ? 'Pro Enabled 🐧' : 'Activate Pro Features'}
            </button>
          </div>
          {!isPro && <p className="text-[10px] text-purple-200 mt-4 font-black uppercase tracking-widest">Requires Gemini API Key in Environment</p>}
        </div>
      </div>
    </div>
  );
};

export default ProLanding;
