
import React from 'react';
import { MOCK_DOCS } from '../constants';
import { DocItem, NavigationSection, Contribution } from '../types';

interface MainContentProps {
  section: NavigationSection;
  onEdit: (doc: DocItem) => void;
  onFlag: (doc: DocItem) => void;
  onRead: (doc: DocItem) => void;
  contributions: Contribution[];
  onReview: (id: string, status: 'approved' | 'rejected') => void;
  searchQuery?: string;
  aiRankedIds: string[];
  aiSearchExplanation?: string;
  isPro: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ 
  section, 
  onEdit, 
  onFlag, 
  onRead,
  contributions, 
  onReview,
  searchQuery,
  aiRankedIds,
  aiSearchExplanation,
  isPro
}) => {
  const getSectionTitle = () => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    switch (section) {
      case NavigationSection.Home: return 'Knowledge Hub';
      case NavigationSection.HowTos: return 'Linux HOWTOs';
      case NavigationSection.Guides: return 'Advanced Guides';
      case NavigationSection.ManPages: return 'Unix Man Pages';
      case NavigationSection.Moderation: return 'Review Queue';
      default: return 'Library';
    }
  };

  const getFilteredDocs = () => {
    let docs = [...MOCK_DOCS];

    if (searchQuery) {
      if (isPro && aiRankedIds.length > 0) {
        docs = docs.filter(d => aiRankedIds.includes(d.id))
                   .sort((a, b) => aiRankedIds.indexOf(a.id) - aiRankedIds.indexOf(b.id));
      } else {
        docs = docs.filter(d => 
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          d.summary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return docs;
    }

    if (section === NavigationSection.Home) return docs;
    
    return docs.filter(d => {
      if (section === NavigationSection.HowTos) return d.category === 'HOWTO';
      if (section === NavigationSection.Guides) return d.category === 'Guide';
      if (section === NavigationSection.ManPages) return d.category === 'ManPage';
      return true;
    });
  };

  const filteredDocs = getFilteredDocs();

  if (section === NavigationSection.Moderation) {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <header>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Review Queue</h1>
          <p className="text-slate-500 mt-2 font-medium">Community submissions awaiting verification.</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {contributions.length === 0 ? (
            <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Nothing to review</p>
            </div>
          ) : (
            contributions.map((con) => (
              <div key={con.id} className="p-8 bg-white border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-xl hover:border-orange-500/20 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      con.type === 'edit' ? 'bg-blue-50 text-blue-600' : 
                      con.type === 'flag' ? 'bg-red-50 text-red-600' : 
                      'bg-green-50 text-green-600'
                    }`}>
                      {con.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{con.submittedBy}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{con.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 font-medium">{con.description}</p>
                </div>
                <div className="flex gap-3">
                   <button 
                    onClick={() => onReview(con.id, 'rejected')}
                    className="px-6 py-3 bg-slate-50 text-slate-500 font-bold text-xs rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all"
                   >
                     Decline
                   </button>
                   <button 
                    onClick={() => onReview(con.id, 'approved')}
                    className="px-6 py-3 bg-orange-500 text-white font-bold text-xs rounded-2xl hover:bg-orange-600 transition-all shadow-lg"
                   >
                     Approve
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            {getSectionTitle()}
          </h1>
          {isPro && searchQuery && aiSearchExplanation && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-2xl text-sm text-slate-700 italic flex items-start gap-3">
              <span className="text-purple-600 font-bold shrink-0">AI Insight:</span>
              <p>{aiSearchExplanation}</p>
            </div>
          )}
          {!searchQuery && (
             <p className="text-slate-400 mt-3 max-w-2xl font-medium text-lg">
                Access the world's most comprehensive Linux documentation library.
             </p>
          )}
        </div>
      </header>

      {section === NavigationSection.Home && !searchQuery && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'HOWTOs', val: '5,821' },
              { label: 'Guides', val: '432' },
              { label: 'Translators', val: '89' },
              { label: 'Uptime', val: '99.9%' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-all"></div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-200">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                 <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                 Kernel Pulse
               </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { tag: 'Kernel', text: 'Kernel 6.13-rc3 released with improved RISC-V support.', time: '2h ago' },
                  { tag: 'Distro', text: 'Ubuntu 24.10 "Oracular Oriole" hits Beta phase.', time: '5h ago' },
                  { tag: 'Security', text: 'New OpenSSH vulnerability patched in upstream.', time: '1d ago' },
                ].map((news, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-[9px] font-black uppercase text-slate-500 tracking-widest">
                      {news.tag}
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-3 leading-tight">
                      {news.text}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase">{news.time}</p>
                  </div>
                ))}
             </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">No matching wisdom found</p>
          </div>
        ) : (
          filteredDocs.map((doc: DocItem) => (
            <div 
              key={doc.id} 
              className={`group relative flex flex-col p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-3xl transition-all cursor-pointer ${isPro ? 'hover:border-purple-500/30' : 'hover:border-orange-500/30'}`}
              onClick={() => onRead(doc)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-1.5 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {doc.category}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 font-bold uppercase">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {doc.lastUpdated}
                </div>
              </div>

              <h3 className={`text-2xl font-black text-slate-900 mb-4 transition-colors ${isPro ? 'group-hover:text-purple-600' : 'group-hover:text-orange-500'}`}>
                {doc.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-3 font-medium flex-1">
                {doc.summary}
              </p>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all">
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onEdit(doc); }} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M18.364 5.636a9 9 0 010 12.728" /></svg>
                  </button>
                </div>
                <div className={`${isPro ? 'text-purple-600' : 'text-orange-500'} font-black text-[10px] uppercase tracking-widest flex items-center gap-2`}>
                  Read Node
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainContent;
