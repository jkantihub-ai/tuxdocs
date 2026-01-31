
import React, { useState } from 'react';
import { TUX_LOGO } from '../constants';
import { NavigationSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  onSearch: (query: string) => void;
  isPro: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate, onSearch, isPro }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: NavigationSection.Home, label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: NavigationSection.Terminal, label: 'Terminal', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: NavigationSection.HowTos, label: 'HOWTOs', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: NavigationSection.Guides, label: 'Guides', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: NavigationSection.Moderation, label: 'Review Queue', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: NavigationSection.About, label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200">
        <div className="p-8 flex items-center gap-4">
          <div className="text-orange-500 bg-orange-50 p-2 rounded-2xl">
            {TUX_LOGO('w-10 h-10')}
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Tux<span className="text-orange-500">Docs</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold rounded-2xl transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 scale-105'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => onNavigate(NavigationSection.Pro)}
            className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-bold rounded-2xl transition-all duration-300 mt-6 ${
              activeSection === NavigationSection.Pro
                ? 'pro-gradient text-white shadow-xl shadow-purple-500/30'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
            Tux Pro {isPro && <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded">ACTIVE</span>}
          </button>
        </nav>

        <div className="p-8">
          <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 blur-2xl group-hover:bg-orange-500/40 transition-all"></div>
            <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mb-2">System Status</p>
            <p className="text-sm font-bold">Stable v4.2.0</p>
            <div className="mt-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPro ? 'bg-purple-500' : 'bg-green-500'} animate-pulse`}></div>
              <span className="text-[10px] text-slate-400 font-bold">{isPro ? 'AI Hub Linked' : 'Uptime 99.9%'}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 bg-white border-b border-slate-100 sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-500 hover:text-slate-900 p-2 bg-slate-50 rounded-xl">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
             </button>
             <div className="text-orange-500">
              {TUX_LOGO('w-8 h-8')}
            </div>
          </div>

          <div className="flex-1 max-w-3xl px-4 hidden sm:block">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={isPro ? "Ask Tux AI: 'how to secure ssh'..." : "Search local library..."}
                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-20 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 transition-all ${isPro ? 'focus:ring-purple-500/10' : ''}`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-slate-200 text-[10px] text-slate-500 font-black">
                ENTER
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="p-3 bg-slate-50 text-slate-400 hover:text-orange-600 rounded-2xl transition-all relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               <span className={`absolute top-3 right-3 w-2.5 h-2.5 ${isPro ? 'bg-purple-500' : 'bg-orange-500'} rounded-full border-2 border-white`}></span>
             </button>
             <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 leading-none">Tux User</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">{isPro ? 'Pro Member' : 'Guest'}</p>
                </div>
                <div className={`w-10 h-10 rounded-2xl ${isPro ? 'pro-gradient' : 'bg-orange-500'} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                  TU
                </div>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="text-orange-500 bg-orange-50 p-2 rounded-2xl">
                {TUX_LOGO('w-10 h-10')}
              </div>
              <span className="text-2xl font-black text-slate-900">TuxDocs</span>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeSection === item.id ? 'bg-orange-500 text-white shadow-xl' : 'text-slate-500'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate(NavigationSection.Pro); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeSection === NavigationSection.Pro ? 'pro-gradient text-white shadow-xl' : 'bg-slate-900 text-white'}`}
              >
                Tux Pro
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
