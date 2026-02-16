
import React, { useState, useEffect } from 'react';
import { Episode } from '../types';
import { generateExecutiveSummary, generateTranscript } from '../geminiService';

interface EpisodeDetailProps {
  episode: Episode;
  onBack: () => void;
  onPlay: (episode: Episode) => void;
}

const EpisodeDetail: React.FC<EpisodeDetailProps> = ({ episode, onBack, onPlay }) => {
  const [activeView, setActiveView] = useState<'summary' | 'transcript'>('summary');
  const [summary, setSummary] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [sum, trans] = await Promise.all([
        generateExecutiveSummary(episode.title, episode.description),
        generateTranscript(episode.title)
      ]);
      setSummary(sum || 'Resumo indisponível no momento');
      setTranscript(trans || 'Transcrição indisponível');
      setIsLoading(false);
    };

    fetchData();
  }, [episode]);

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto mb-32">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-[#d4af37] transition-colors mb-8"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar para Biblioteca
      </button>

      <div className="flex flex-col md:flex-row gap-12 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <img 
              src={episode.coverImage} 
              alt={episode.title} 
              className="w-full aspect-square rounded-3xl object-cover shadow-2xl border-4 border-[#1e293b]"
            />
            {episode.isLive && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
                EM DIRECTO
              </div>
            )}
          </div>
          <button 
            onClick={() => onPlay(episode)}
            className="w-full mt-6 bg-[#d4af37] text-black font-bold py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Reproduzir Agora
          </button>
        </div>

        <div className="w-full md:w-2/3">
          <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest bg-[#d4af37]/10 px-3 py-1 rounded-full">{episode.category}</span>
          <h1 className="text-5xl font-premium font-bold mt-4 mb-6 leading-tight">{episode.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <img src={episode.hostAvatar} className="w-12 h-12 rounded-full border-2 border-[#d4af37]" alt={episode.host} />
            <div>
              <p className="font-bold text-slate-200">{episode.host}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{episode.duration} • {episode.date}</p>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-lg mb-8">{episode.description}</p>
          
          {episode.chapters && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm uppercase text-slate-500 tracking-wider">Capítulos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {episode.chapters.map((ch, idx) => (
                  <div key={idx} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex items-center gap-3">
                    <span className="text-[#d4af37] font-mono text-xs">{ch.time}</span>
                    <span className="text-sm font-medium">{ch.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0a121e] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-slate-800">
          <button 
            onClick={() => setActiveView('summary')}
            className={`flex-1 py-5 text-sm font-bold tracking-widest uppercase transition-colors ${activeView === 'summary' ? 'bg-[#1e293b] text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Resumo Executivo
          </button>
          <button 
            onClick={() => setActiveView('transcript')}
            className={`flex-1 py-5 text-sm font-bold tracking-widest uppercase transition-colors ${activeView === 'transcript' ? 'bg-[#1e293b] text-[#d4af37] border-b-2 border-[#d4af37]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Transcrição Completa
          </button>
        </div>

        <div className="p-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 font-premium">A IA está processando o áudio corporativo...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-headings:font-premium">
              <div className="whitespace-pre-wrap leading-relaxed">
                {activeView === 'summary' ? summary : transcript}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
