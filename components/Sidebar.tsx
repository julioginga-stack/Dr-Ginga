
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userAvatar }) => {
  const navItems = [
    { id: 'library', label: 'Biblioteca', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'live', label: 'Ao Vivo', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', isLive: true },
    { id: 'favorites', label: 'Favoritos', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'dashboard', label: 'Performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'profile', label: 'Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="w-64 bg-[#0a121e] border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#d4af37] p-2 rounded-lg">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>
          <span className="font-premium text-2xl font-bold tracking-tight text-[#d4af37]">Dr Ginga</span>
        </div>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-slate-800 to-transparent text-white border-l-4 border-[#d4af37]' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium text-sm">{item.label}</span>
              {item.isLive && (
                <span className="absolute right-4 w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`w-full bg-[#1e293b]/30 p-4 rounded-xl transition-all hover:bg-slate-800/50 text-left border ${activeTab === 'profile' ? 'border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border-transparent'}`}
        >
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Membro Premium</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs overflow-hidden border border-[#d4af37]/30">
               <img src={userAvatar || "https://i.pravatar.cc/150?u=jane"} alt="User" />
            </div>
            <div>
              <p className="text-sm font-semibold truncate">Dr. Ricardo Ginga</p>
              <p className="text-[10px] text-slate-400">Plano Executivo</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
