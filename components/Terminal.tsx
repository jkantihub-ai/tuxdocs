import React, { useState, useRef, useEffect } from 'react';
import { executeSimulatedCommand } from '../services/gemini.ts';

interface TerminalProps {
  isPro: boolean;
  onUpgrade: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isPro, onUpgrade }) => {
  const [history, setHistory] = useState<{ type: 'cmd' | 'out', text: string }[]>([
    { type: 'out', text: 'Welcome to TuxDocs Virtual Terminal v1.0.0' },
    { type: 'out', text: isPro ? 'AI Intelligence active. Try any Linux command.' : 'Static Mode: Try help, ls, whoami, uname, date, clear.' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const mockProcess = (cmd: string): string => {
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case 'help':
        return 'Available commands: help, ls, whoami, uname, date, clear, cat, echo\nUpgrade to Pro for AI-simulated full kernel context.';
      case 'ls':
        return 'Documents/  Downloads/  Kernel/  Scripts/  tuxdocs_config.yaml';
      case 'whoami':
        return 'tux';
      case 'uname':
        return 'Linux tuxdocs-node 6.8.0-42-generic #42-Ubuntu SMP PREEMPT_DYNAMIC';
      case 'date':
        return new Date().toString();
      case 'cat':
        return args[1] ? `Reading ${args[1]}... (Upgrade to Pro for full file simulation)` : 'cat: missing file operand';
      case 'echo':
        return args.slice(1).join(' ');
      default:
        return `bash: ${command}: command not found. (Enable Pro for AI fallback)`;
    }
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim();
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    setInput('');
    setIsProcessing(true);

    if (cmd === 'clear') {
      setHistory([]);
      setIsProcessing(false);
      return;
    }

    if (isPro) {
      try {
        const output = await executeSimulatedCommand(cmd, history.map(h => h.text).slice(-5));
        setHistory(prev => [...prev, { type: 'out', text: output }]);
      } catch (err) {
        setHistory(prev => [...prev, { type: 'out', text: mockProcess(cmd) }]);
      } finally {
        setIsProcessing(false);
      }
    } else {
      setTimeout(() => {
        const output = mockProcess(cmd);
        setHistory(prev => [...prev, { type: 'out', text: output }]);
        setIsProcessing(false);
      }, 300);
    }
  };

  return (
    <div className="space-y-6">
      {!isPro && (
        <div className="p-6 pro-gradient rounded-3xl text-white flex items-center justify-between shadow-xl">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-white/20 rounded-xl">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <div>
               <p className="font-black text-sm">Upgrade to Tux Pro</p>
               <p className="text-xs text-purple-100">Unlock AI-powered terminal simulation and kernel insights.</p>
             </div>
           </div>
           <button onClick={onUpgrade} className="px-6 py-2 bg-white text-purple-600 font-bold text-xs rounded-xl hover:scale-105 transition-all shadow-lg">Upgrade</button>
        </div>
      )}
      
      <div className="flex flex-col h-[65vh] bg-[#0d0d0d] rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden font-mono">
        <div className="bg-[#1a1a1a] px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{isPro ? 'AI Simulated Kernel' : 'Static Local Shell'}</div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 text-sm">
          {history.map((line, i) => (
            <div key={i} className={line.type === 'cmd' ? 'text-orange-500' : 'text-slate-300'}>
              {line.type === 'cmd' && <span className="text-green-500 mr-2">tux@docs:~$</span>}
              <pre className="whitespace-pre-wrap">{line.text}</pre>
            </div>
          ))}
          {isProcessing && (
            <div className="text-orange-500 animate-pulse">_</div>
          )}
        </div>

        <form onSubmit={handleCommand} className="p-4 bg-[#111] border-t border-slate-800 flex items-center">
          <span className="text-green-500 mr-2">tux@docs:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-white text-sm"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;