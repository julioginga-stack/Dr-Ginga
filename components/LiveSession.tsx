
import React, { useState, useRef, useEffect } from 'react';

const LiveSession: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [mode, setMode] = useState<'audio' | 'video' | 'presentation'>('audio');
  const [currentSlide, setCurrentSlide] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startBroadcast = async () => {
    setIsLive(true);
    if (mode === 'video' || mode === 'presentation') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Erro ao acessar câmara:", err);
      }
    }
  };

  const stopBroadcast = () => {
    setIsLive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => stopBroadcast();
  }, []);

  return (
    <div className="animate-fadeIn space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-premium font-bold">Broadcast Studio</h2>
        <div className="flex gap-2">
          {isLive && <span className="flex items-center gap-2 bg-red-600 px-4 py-1 rounded-full text-[10px] font-bold animate-pulse">ON AIR</span>}
          <span className="bg-slate-800 px-4 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estúdio HD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Stage */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-black aspect-video rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl">
            {mode === 'audio' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black">
                <div className="w-32 h-32 rounded-full border-4 border-[#d4af37] p-1 mb-6 animate-pulse">
                  <img src="https://i.pravatar.cc/150?u=ginga" className="w-full h-full rounded-full object-cover" alt="Host" />
                </div>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-[#d4af37] rounded-full animate-bounce" style={{ height: `${Math.random() * 40 + 10}px`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
            )}

            {(mode === 'video' || (mode === 'presentation' && isLive)) && (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            )}

            {mode === 'presentation' && (
              <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center p-12">
                <div className="w-full h-full bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center text-slate-900 p-8">
                  <div className="text-[#d4af37] font-bold text-sm mb-4">SLIDE {currentSlide} / 12</div>
                  <h3 className="text-3xl font-premium font-bold text-center mb-8">Estratégias de Crescimento Exponencial</h3>
                  <div className="w-full h-1 bg-slate-100 mb-8"></div>
                  <ul className="space-y-4 text-left w-full max-w-md">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span className="font-semibold">Análise de Mercado Global</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                      <span className="font-semibold">Retenção de Talentos Senior</span>
                    </li>
                  </ul>
                  {isLive && (
                    <div className="absolute bottom-6 right-6 w-32 aspect-video bg-black rounded-lg overflow-hidden border-2 border-[#d4af37]">
                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                  <button onClick={() => setCurrentSlide(s => Math.max(1, s-1))} className="p-2 bg-black/50 rounded-full hover:bg-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={() => setCurrentSlide(s => s+1)} className="p-2 bg-black/50 rounded-full hover:bg-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}

            {!isLive && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <button 
                  onClick={startBroadcast}
                  className="bg-[#d4af37] text-black px-12 py-4 rounded-2xl font-bold text-xl hover:scale-110 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  START BROADCAST
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setMode('audio')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'audio' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              <span className="text-xs font-bold uppercase">Apenas Áudio</span>
            </button>
            <button 
              onClick={() => setMode('video')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'video' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span className="text-xs font-bold uppercase">Vídeo + Áudio</span>
            </button>
            <button 
              onClick={() => setMode('presentation')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${mode === 'presentation' ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span className="text-xs font-bold uppercase">PowerPoint</span>
            </button>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Controle de Sala</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Microfone</span>
                <div className="w-10 h-5 bg-[#d4af37] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Câmara HD</span>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full"></div></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Chat Ativo</span>
                <div className="w-10 h-5 bg-[#d4af37] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-slate-800">
               <button 
                 onClick={stopBroadcast}
                 className="w-full bg-red-600/10 text-red-500 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"
               >
                 Terminar Sessão
               </button>
            </div>
          </div>

          <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Espectadores</h3>
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-[#0a121e]" />
              ))}
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0a121e] flex items-center justify-center text-[10px] font-bold">+142</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
