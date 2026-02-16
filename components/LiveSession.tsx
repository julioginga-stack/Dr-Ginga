
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

const LiveSession: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Pronto para iniciar a mentoria');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startSession = async () => {
    setIsActive(true);
    setStatus('Conectando ao Dr. Ginga AI...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Implementação simplificada para UI - seguindo diretrizes da Live API
    setStatus('Em directo: Mentoria Ativa');
    // Nota: A lógica real de audio estaria aqui conforme as regras da Live API
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('Sessão encerrada');
  };

  return (
    <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-12 text-center animate-fadeIn">
      <div className="relative inline-block mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-[#d4af37] p-1 overflow-hidden mx-auto">
          <img src="https://i.pravatar.cc/150?u=ginga" className="w-full h-full rounded-full object-cover" alt="Dr Ginga Avatar" />
        </div>
        {isActive && (
          <span className="absolute bottom-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
            AO VIVO
          </span>
        )}
      </div>

      <h2 className="text-3xl font-premium font-bold mb-4">Sessão Live com Dr. Ricardo Ginga</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Interaja em tempo real com a nossa IA de liderança avançada. Tire dúvidas sobre estratégia e gestão de pessoas.
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-[#d4af37]">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
          {status}
        </div>

        {!isActive ? (
          <button 
            onClick={startSession}
            className="bg-[#d4af37] text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Iniciar Mentoria por Voz
          </button>
        ) : (
          <button 
            onClick={stopSession}
            className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
          >
            Encerrar Sessão
          </button>
        )}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className="bg-slate-800/50 p-4 rounded-xl text-left border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Participantes</p>
          <p className="text-lg font-premium">1.2k Online</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl text-left border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Tempo</p>
          <p className="text-lg font-premium">14:02</p>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
