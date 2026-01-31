
import React, { useEffect, useState } from 'react';
import { DocItem } from '../types';
import { summarizeArticle } from '../services/gemini';

interface ArticleViewProps {
  doc: DocItem;
  onBack: () => void;
  isPro: boolean;
}

const ArticleView: React.FC<ArticleViewProps> = ({ doc, onBack, isPro }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isPro) {
      const fetchSummary = async () => {
        setIsLoading(true);
        try {
          const res = await summarizeArticle(doc.title, doc.summary);
          setAiSummary(res || 'Summary generation failed.');
        } catch (e) {
          setAiSummary('The AI is currently offline.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchSummary();
    }
  }, [doc, isPro]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-600 font-bold text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <header>
            <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full inline-block text-[10px] font-bold uppercase tracking-widest mb-4">
              {doc.category}
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{doc.title}</h1>
            <div className="flex gap-4 mt-4 text-xs text-slate-400 font-medium">
              <span>Last Updated: {doc.lastUpdated}</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </header>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
            <p className="text-xl font-medium text-slate-800">{doc.summary}</p>
            <div className="h-px bg-slate-100 w-full my-8"></div>
            <p>
              The Linux Documentation Project (TLDP) provides comprehensive documentation for Linux, including HOWTOs, guides, and man pages. 
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-10">Introduction to {doc.title}</h3>
            <p>
              To get started with this technology, ensure that base kernel requirements are met. Modern Linux distributions (kernel 5.15+) generally support most features out-of-the-box.
            </p>
            <div className="bg-slate-900 rounded-2xl p-6 text-orange-400 font-mono text-sm shadow-xl">
              # Example usage<br/>
              sudo apt update && sudo apt upgrade<br/>
              modprobe tuning_module
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          {isPro ? (
            <div className="p-8 rounded-[2rem] bg-purple-50 border border-purple-100 shadow-xl shadow-purple-500/5">
              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3z" /></svg>
                AI Librarian Insights
              </h3>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-purple-200/50 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-purple-200/50 rounded animate-pulse w-full"></div>
                </div>
              ) : (
                <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {aiSummary}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col items-center text-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-sm">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <p className="font-bold text-slate-900">Unlock AI Insights</p>
               <p className="text-xs text-slate-500">Enable Pro for automated summaries and tips.</p>
            </div>
          )}

          <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg">
             <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
             <div className="space-y-3">
               <button className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6" /></svg>
                 Download PDF
               </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleView;
