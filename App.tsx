import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import MainContent from './components/MainContent.tsx';
import TuxAssistant from './components/TuxAssistant.tsx';
import ContributionForm from './components/ContributionForm.tsx';
import Terminal from './components/Terminal.tsx';
import ArticleView from './components/ArticleView.tsx';
import About from './components/About.tsx';
import ProLanding from './components/ProLanding.tsx';
import { NavigationSection, DocItem, Contribution } from './types.ts';
import { searchDocsAI } from './services/gemini.ts';
import { MOCK_DOCS } from './constants.tsx';

const App: React.FC = () => {
  // Since this App.tsx is only loaded by pro.html, isProEnabled is true by default
  const [activeSection, setActiveSection] = useState<NavigationSection>(NavigationSection.Home);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRankedIds, setAiRankedIds] = useState<string[]>([]);
  const [aiSearchExplanation, setAiSearchExplanation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isProEnabled, setIsProEnabled] = useState(true);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [activeContribution, setActiveContribution] = useState<{type: 'edit' | 'new' | 'flag', doc?: DocItem} | null>(null);
  const [viewingArticle, setViewingArticle] = useState<DocItem | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setViewingArticle(null);
    if (!query.trim()) {
      setAiRankedIds([]);
      setAiSearchExplanation('');
      return;
    }
    
    setActiveSection(NavigationSection.Home);

    setIsSearching(true);
    try {
      const result = await searchDocsAI(query, MOCK_DOCS);
      if (result && result.relevantIds && result.relevantIds.length > 0) {
        setAiRankedIds(result.relevantIds);
        setAiSearchExplanation(result.explanation);
      } else {
        setAiRankedIds([]);
        setAiSearchExplanation('Tux AI couldn\'t find a specific match, showing standard results.');
      }
    } catch (e) {
      console.error("AI Search Failed", e);
      setAiRankedIds([]);
      setAiSearchExplanation('');
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavigate = (section: NavigationSection) => {
    // If the user wants to go back to the static library
    if (section === NavigationSection.Home && window.location.pathname.includes('index.html')) {
        // Already handled by navigation buttons linking to index.html
    }

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
      return <ArticleView doc={viewingArticle} onBack={() => setViewingArticle(null)} isPro={isProEnabled} />;
    }

    switch (activeSection) {
      case NavigationSection.Terminal:
        return <Terminal isPro={isProEnabled} onUpgrade={() => {}} />;
      case NavigationSection.About:
        return <About />;
      case NavigationSection.Pro:
        return <ProLanding isPro={isProEnabled} onUpgrade={() => {}} />;
      default:
        if (isSearching) {
          return (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-purple-500`}></div>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">AI Librarian Searching...</p>
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
            onReview={(id, status) => setContributions(prev => prev.filter(c => c.id !== id))}
            searchQuery={searchQuery}
            aiRankedIds={aiRankedIds}
            aiSearchExplanation={aiSearchExplanation}
            isPro={isProEnabled}
          />
        );
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      isPro={isProEnabled}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
        
        {activeSection === NavigationSection.Home && !searchQuery && !viewingArticle && !isSearching && (
          <section className={`mt-20 p-8 md:p-16 rounded-[4rem] relative overflow-hidden text-white shadow-3xl bg-slate-900 border border-purple-500/30`}>
            <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/20 to-transparent blur-[120px]`}></div>
            <div className="relative z-10 max-w-2xl">
              <div className={`px-4 py-2 rounded-2xl inline-block text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-purple-500/10 border border-purple-500/20 text-purple-400`}>
                Tux Pro Artificial Intelligence
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Empowering <span className="text-purple-500">Systems</span> through Knowledge.
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed font-medium">
                Advanced AI librarian active. Ask questions in natural language, simulate shell commands, and get automated technical insights.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <button 
                  onClick={() => handleNavigate(NavigationSection.HowTos)}
                  className={`px-8 py-4 sm:px-10 sm:py-5 text-white font-black rounded-2xl transition-all shadow-2xl scale-105 active:scale-95 bg-purple-600 hover:bg-purple-700 shadow-purple-500/40`}
                >
                  Browse HOWTOs
                </button>
                <button 
                    onClick={() => window.location.href = './index.html'}
                    className="px-8 py-4 sm:px-10 sm:py-5 bg-white/5 hover:bg-white/10 text-white font-black border border-white/10 rounded-2xl transition-all backdrop-blur-md"
                >
                    Back to Static Library
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

      {isProEnabled && <TuxAssistant />}
      
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t px-6 sm:px-10 py-3 flex items-center justify-between pointer-events-none md:pointer-events-auto z-[40] bg-slate-900/80 border-slate-800 text-slate-400`}>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
          <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] bg-purple-500`}></div>
          Node: ldp-pro-01
        </div>
        <div className="hidden sm:block text-[10px] font-bold tracking-widest uppercase opacity-50">
          The Linux Documentation Project &copy; 2025 • AI Enhanced
        </div>
      </div>
    </Layout>
  );
};

export default App;