
import React, { useEffect, useState } from 'react';
import { DocItem } from '../types';
import { summarizeArticle } from '../services/gemini';

interface ArticleViewProps {
  doc: DocItem;
  onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ doc, onBack }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const res = await summarizeArticle(doc.title, doc.summary);
        setAiSummary(res || 'Summary generation failed.');
      } catch (e) {
        setAiSummary('The AI is currently offline, but you can read the full documentation below.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, [doc]);

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
              This is a full article simulation. In a real application, the content would be fetched from the TLDP archives. 
              The Linux Documentation Project (TLDP) provides comprehensive documentation for Linux, including HOWTOs, 
              guides, and man pages. 
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-10">Introduction to {doc.title}</h3>
            <p>
              To get started with this technology, one must first ensure that the base kernel requirements are met. 
              Modern Linux distributions (kernel 5.15+) generally support most features out-of-the-box, but advanced 
              tuning may require specific module configurations.
            </p>
            <div className="bg-slate-900 rounded-2xl p-6 text-orange-400 font-mono text-sm shadow-xl">
              # Example usage<br/>
              sudo apt update && sudo apt upgrade<br/>
              modprobe tuning_module
            </div>
            <p>
              Documentation of this nature is vital for maintaining the open-source ecosystem. 
              Community-driven guides ensure that even the most complex kernel parameters are understandable to 
              sysadmins of all levels.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100 shadow-xl shadow-orange-500/5">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16.464 18.586a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707z" /></svg>
              AI Insights
            </h3>
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-orange-200/50 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-orange-200/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-orange-200/50 rounded animate-pulse w-2/3"></div>
              </div>
            ) : (
              <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {aiSummary}
              </div>
            )}
          </div>

          <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg">
             <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
             <div className="space-y-3">
               <button className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 Download PDF
               </button>
               <button className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                 Share Article
               </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleView;
