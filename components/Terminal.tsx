
import React, { useState, useRef, useEffect } from 'react';
import { executeSimulatedCommand } from '../services/gemini';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{ type: 'cmd' | 'out', text: string }[]>([
    { type: 'out', text: 'Welcome to TuxDocs AI Terminal v1.0.0-LDP' },
    { type: 'out', text: 'Type "help" or any Linux command to start exploring.' }
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
        return 'Available commands: help, ls, whoami, uname, date, clear, cat, echo\nThis terminal is AI-simulated; try any Linux command!';
      case 'ls':
        return 'Documents/  Downloads/  Kernel/  Scripts/  tuxdocs_config.yaml';
      case 'whoami':
        return 'tux';
      case 'uname':
        return 'Linux tuxdocs-node 6.8.0-42-generic #42-Ubuntu SMP PREEMPT_DYNAMIC';
      case 'date':
        return new Date().toString();
      case 'cat':
        return args[1] ? `Reading ${args[1]}... Access denied: AI required for full context simulation.` : 'cat: missing file operand';
      case 'echo':
        return args.slice(1).join(' ');
      default:
        return `bash: ${command}: command not found (Falling back to AI...)`;
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

    try {
      // First try AI simulation
      const output = await executeSimulatedCommand(cmd, history.map(h => h.text).slice(-5));
      setHistory(prev => [...prev, { type: 'out', text: output }]);
    } catch (err) {
      // Fallback to local mock
      const output = mockProcess(cmd);
      setHistory(prev => [...prev, { type: 'out', text: output }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-[#0d0d0d] rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden font-mono">
      <div className="bg-[#1a1a1a] px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AI Simulated Kernel (v6.8-Tux)</div>
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
  );
};

export default Terminal;
