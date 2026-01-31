
import React, { useState } from 'react';
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import TuxAssistant from './components/TuxAssistant';
import ContributionForm from './components/ContributionForm';
import Terminal from './components/Terminal';
import ArticleView from './components/ArticleView';
import { NavigationSection, DocItem, Contribution } from './types';
import { searchDocsAI } from './services/gemini';
import { MOCK_DOCS } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavigationSection>(NavigationSection.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRankedIds, setAiRankedIds] = useState<string[]>([]);
  const [aiSearchExplanation, setAiSearchExplanation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [activeContribution, setActiveContribution] = useState<{type: 'edit' | 'new' | 'flag', doc?: DocItem} | null>(null);
  const [viewingArticle, setViewingArticle] = useState<DocItem | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setViewingArticle(null);
    if (!query) {
      setAiRankedIds([]);
      setAiSearchExplanation('');
      return;
    }
    setIsSearching(true);
    setActiveSection(NavigationSection.Home);
    try {
      const result = await searchDocsAI(query, MOCK_DOCS);
      setAiRankedIds(result.relevantIds);
      setAiSearchExplanation(result.explanation);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavigate = (section: NavigationSection) => {
    setActiveSection(section);
    setSearchQuery('');
    setAiRankedIds([]);
    setAiSearchExplanation('');
    setViewingArticle(null);
  };

  const handleSubmitContribution = (data: any) => {
    const newCon: Contribution = {
      id: Math.random().toString(36).substr(2, 9),
      type: data.type,
      title: data.title,
      description: data.description,
      status: 'pending',
      submittedBy: 'Anonymous Penguin',
      timestamp: new Date().toLocaleDateString(),
      targetId: data.targetId
    };
    setContributions(prev => [...prev, newCon]);
    setActiveContribution(null);
  };

  const renderContent = () => {
    if (viewingArticle) {
      return <ArticleView doc={viewingArticle} onBack={() => setViewingArticle(null)} />;
    }

    if (activeSection === NavigationSection.Terminal) {
      return <Terminal />;
    }

    if (isSearching) {
      return (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">AI Indexing docs...</p>
        </div>
      );
    }

    return (
      <MainContent 
        section={activeSection} 
        onEdit={(doc) => setActiveContribution({ type: 'edit', doc })}
        onFlag={(doc) => setActiveContribution({ type: 'flag', doc })}
        onRead={(doc) => setViewingArticle(doc)}
        contributions={contributions}
        onReview={(id) => setContributions(prev => prev.filter(c => c.id !== id))}
        searchQuery={searchQuery}
        aiRankedIds={aiRankedIds}
        aiSearchExplanation={aiSearchExplanation}
      />
    );
  };

  return (
    <Layout 
      activeSection={activeSection} 
      onNavigate={handleNavigate}
      onSearch={handleSearch}
    >
      <div className="max-w-7xl mx-auto h-full">
        {renderContent()}
        
        {activeSection === NavigationSection.Home && !searchQuery && !viewingArticle && !isSearching && (
          <section className="mt-20 p-12 md:p-16 rounded-[4rem] relative overflow-hidden bg-slate-900 text-white shadow-3xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent blur-[120px]"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-2xl inline-block text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">
                Next-Gen LDP Portal
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Empowering <span className="text-orange-500">Systems</span> through Knowledge.
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed font-medium">
                TuxDocs simplifies complex Linux documentation with real-time AI insights, a simulated terminal for safe testing, and a crowdsourced moderation engine.
              </p>
              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={() => setActiveSection(NavigationSection.HowTos)}
                  className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-2xl shadow-orange-500/40 scale-105 active:scale-95"
                >
                  Browse HOWTOs
                </button>
                <button 
                  onClick={() => setActiveContribution({ type: 'new' })}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black border border-white/10 rounded-2xl transition-all backdrop-blur-md"
                >
                  Contribute Node
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {activeContribution && (
        <ContributionForm 
          onClose={() => setActiveContribution(null)}
          onSubmit={handleSubmitContribution}
          type={activeContribution.type}
          targetTitle={activeContribution.doc?.title}
          targetId={activeContribution.doc?.id}
        />
      )}

      <TuxAssistant />
      
      <div className="fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-xl border-t border-slate-100 px-10 py-2 flex items-center justify-between pointer-events-none md:pointer-events-auto z-[40]">
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
          Node: ldp-distributed-01
        </div>
        <div className="hidden sm:block text-[10px] text-slate-300 font-bold">
          The Linux Documentation Project © 2025 • AI-Enhanced Experience
        </div>
      </div>
    </Layout>
  );
};

export default App;
