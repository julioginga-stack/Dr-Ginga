
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Dashboard from './components/Dashboard';
import EpisodeDetail from './components/EpisodeDetail';
import { MOCK_EPISODES } from './constants';
import { Episode, Category } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('library');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');

  const filteredEpisodes = MOCK_EPISODES.filter(ep => {
    const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ep.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || ep.category === filterCategory;
    const matchesTab = activeTab === 'favorites' ? ep.isFavorite : true;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const renderLibrary = () => (
    <div className="animate-fadeIn space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-premium font-bold mb-4">
            {activeTab === 'favorites' ? 'Your Favorites' : 'Premium Library'}
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Exclusive insights from the world's most innovative business leaders, curated for the modern executive.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search episodes, hosts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {['All', ...Object.values(Category)].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat as Category | 'All')}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold border transition-all ${
              filterCategory === cat 
                ? 'bg-[#d4af37] text-black border-[#d4af37]' 
                : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredEpisodes.map(ep => (
          <div 
            key={ep.id} 
            className="group bg-[#0a121e] border border-slate-800 rounded-3xl overflow-hidden hover:border-[#d4af37]/50 transition-all cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedEpisode(ep)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={ep.coverImage} 
                alt={ep.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     setNowPlaying(ep);
                   }}
                   className="w-16 h-16 bg-[#d4af37] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                 >
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </button>
              </div>
              <div className="absolute top-4 right-4">
                 {ep.isFavorite && (
                   <div className="bg-[#d4af37] p-2 rounded-full shadow-lg">
                     <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                   </div>
                 )}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest mb-2">{ep.category}</span>
              <h3 className="font-premium text-xl font-bold mb-1 group-hover:text-[#d4af37] transition-colors">{ep.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{ep.host}</p>
              <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
                <span>{ep.date}</span>
                <span className="bg-slate-800 px-2 py-1 rounded">{ep.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredEpisodes.length === 0 && (
        <div className="text-center py-32 bg-[#1e293b]/20 rounded-3xl border border-dashed border-slate-800">
           <svg className="w-16 h-16 text-slate-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
           </svg>
           <h3 className="text-xl font-premium text-slate-400">No episodes found in this category.</h3>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedEpisode(null); }} />
      
      <main className="flex-grow ml-64 p-8 md:p-12 pb-48">
        {selectedEpisode ? (
          <EpisodeDetail 
            episode={selectedEpisode} 
            onBack={() => setSelectedEpisode(null)} 
            onPlay={setNowPlaying}
          />
        ) : (
          <>
            {activeTab === 'library' || activeTab === 'favorites' ? renderLibrary() : null}
            {activeTab === 'dashboard' ? <Dashboard /> : null}
          </>
        )}
      </main>

      <Player episode={nowPlaying} />
    </div>
  );
};

export default App;
