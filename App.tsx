
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Dashboard from './components/Dashboard';
import EpisodeDetail from './components/EpisodeDetail';
import LiveSession from './components/LiveSession';
import Profile from './components/Profile';
import ContentForm from './components/ContentForm';
import { MOCK_EPISODES } from './constants';
import { Episode, Category } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('library');
  const [episodes, setEpisodes] = useState<Episode[]>(MOCK_EPISODES);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'Todos'>('Todos');
  
  // Modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

  // Perfil do utilizador
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Ricardo Ginga',
    avatar: 'https://i.pravatar.cc/150?u=ginga',
    role: 'Executive Host',
    bio: 'Especialista em comunicação estratégica e liderança corporativa com mais de 20 anos de experiência em mercados globais.'
  });

  const uniqueHosts = Array.from(new Set(episodes.map(ep => ({ name: ep.host, avatar: ep.hostAvatar }))));

  const filteredEpisodes = episodes.filter(ep => {
    const epHostName = ep.host === 'Dr. Ricardo Ginga' ? userProfile.name : ep.host;
    const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         epHostName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || ep.category === filterCategory;
    const matchesTab = activeTab === 'favorites' ? ep.isFavorite : true;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleSaveContent = (data: Partial<Episode>) => {
    if (editingEpisode) {
      setEpisodes(prev => prev.map(ep => ep.id === editingEpisode.id ? { ...ep, ...data } as Episode : ep));
    } else {
      const newEp: Episode = {
        ...data as Episode,
        id: `ep-${Date.now()}`,
        host: userProfile.name,
        hostAvatar: userProfile.avatar,
        date: 'Hoje',
        isFavorite: false,
      };
      setEpisodes(prev => [newEp, ...prev]);
    }
    setIsFormOpen(false);
    setEditingEpisode(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja eliminar este conteúdo executivo?')) {
      setEpisodes(prev => prev.filter(ep => ep.id !== id));
    }
  };

  const handleShare = (ep: Episode, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`A partilhar "${ep.title}" para LinkedIn e Teams...`);
  };

  const renderLibrary = () => (
    <div className="animate-fadeIn space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-premium font-bold mb-4">
            {activeTab === 'favorites' ? 'Seus Favoritos' : 'Biblioteca Premium'}
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Gestão inteligente de conteúdos e insights exclusivos para o ecossistema corporativo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#d4af37] text-black px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Novo Conteúdo
          </button>
          <div className="relative flex-grow md:w-80">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Buscar conteúdos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
        {uniqueHosts.map((host, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-3 group cursor-pointer"
            onClick={() => setSearchQuery(host.name)}
          >
            <div className="w-20 h-20 rounded-full border-2 border-slate-800 p-1 group-hover:border-[#d4af37] transition-all relative">
              <img 
                src={host.name === 'Dr. Ricardo Ginga' ? userProfile.avatar : host.avatar} 
                className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all shadow-xl" 
                alt={host.name} 
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-white uppercase tracking-wider">{host.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredEpisodes.map(ep => {
           const currentAvatar = ep.host === 'Dr. Ricardo Ginga' ? userProfile.avatar : ep.hostAvatar;
           const currentHostName = ep.host === 'Dr. Ricardo Ginga' ? userProfile.name : ep.host;
           return (
            <div 
              key={ep.id} 
              className="group bg-[#0a121e] border border-slate-800 rounded-3xl overflow-hidden hover:border-[#d4af37]/50 transition-all cursor-pointer flex flex-col h-full relative"
              onClick={() => setSelectedEpisode({...ep, host: currentHostName, hostAvatar: currentAvatar})}
            >
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img src={ep.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ep.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button 
                     onClick={(e) => { e.stopPropagation(); if (!ep.isLive) setNowPlaying({...ep, host: currentHostName, hostAvatar: currentAvatar}); }}
                     className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                   >
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </button>
                   <div className="flex flex-col gap-2">
                     <button 
                       onClick={(e) => { e.stopPropagation(); setEditingEpisode(ep); setIsFormOpen(true); }}
                       className="p-3 bg-[#1e293b] text-[#d4af37] rounded-full hover:bg-slate-800 transition-colors border border-slate-700"
                       title="Editar"
                     >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                     </button>
                     <button 
                       onClick={(e) => handleShare(ep, e)}
                       className="p-3 bg-[#1e293b] text-blue-400 rounded-full hover:bg-slate-800 transition-colors border border-slate-700"
                       title="Partilhar"
                     >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                     </button>
                   </div>
                   <button 
                      onClick={(e) => handleDelete(ep.id, e)}
                      className="absolute top-4 right-4 p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <img src={currentAvatar} className="w-6 h-6 rounded-full border border-[#d4af37]" alt={currentHostName} />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{currentHostName}</span>
                </div>
                <h3 className="font-premium text-xl font-bold mb-1 group-hover:text-[#d4af37] transition-colors">{ep.title}</h3>
                <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-tighter pt-4">
                  <span>{ep.date}</span>
                  <span className={`${ep.isLive ? 'text-red-500' : 'bg-slate-800'} px-2 py-1 rounded`}>{ep.duration}</span>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050a12] text-slate-100 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setSelectedEpisode(null); }} 
        userAvatar={userProfile.avatar}
        userName={userProfile.name}
      />
      
      <main className="flex-grow ml-64 p-8 md:p-12 pb-48">
        {selectedEpisode ? (
          <EpisodeDetail 
            episode={selectedEpisode} 
            onBack={() => setSelectedEpisode(null)} 
            onPlay={setNowPlaying}
          />
        ) : (
          <>
            {(activeTab === 'library' || activeTab === 'favorites') && renderLibrary()}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'live' && <LiveSession />}
            {activeTab === 'profile' && <Profile user={userProfile} onUpdate={setUserProfile} />}
          </>
        )}
      </main>

      <Player episode={nowPlaying} />
      
      {isFormOpen && (
        <ContentForm 
          episode={editingEpisode} 
          onClose={() => { setIsFormOpen(false); setEditingEpisode(null); }}
          onSave={handleSaveContent}
        />
      )}
    </div>
  );
};

export default App;
