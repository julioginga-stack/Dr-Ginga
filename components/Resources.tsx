
import React, { useState } from 'react';

interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

const Resources: React.FC = () => {
  const [files, setFiles] = useState<SharedFile[]>([
    { id: '1', name: 'Plano_Estrategico_2024.pdf', type: 'pdf', size: '2.4 MB', date: 'Hoje' },
    { id: '2', name: 'Apresentacao_Investidores.pptx', type: 'pptx', size: '15.6 MB', date: 'Ontem' },
    { id: '3', name: 'Metricas_Q3.xlsx', type: 'xlsx', size: '840 KB', date: '10 Mai' },
  ]);

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const newFile: SharedFile = {
          id: Math.random().toString(),
          name: file.name,
          type: file.name.split('.').pop() || 'file',
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          date: 'Hoje'
        };
        setFiles([newFile, ...files]);
      }
    };
    input.click();
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf': return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
      case 'pptx': return 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      default: return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-premium font-bold mb-2">Central de Recursos</h2>
          <p className="text-slate-400">Gerencie ficheiros, apresentações e documentos de apoio.</p>
        </div>
        <button 
          onClick={handleUpload}
          className="bg-[#d4af37] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Carregar Ficheiro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map(file => (
          <div key={file.id} className="bg-[#0a121e] border border-slate-800 p-6 rounded-3xl hover:border-[#d4af37]/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-900 rounded-2xl text-[#d4af37]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIcon(file.type)} />
                </svg>
              </div>
              <button className="text-slate-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
            </div>
            <h4 className="font-bold text-lg mb-1 truncate">{file.name}</h4>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">{file.size} • {file.date}</p>
            
            <div className="flex gap-3">
              <button className="flex-grow bg-slate-800 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">Visualizar</button>
              <button className="px-4 bg-[#d4af37]/10 text-[#d4af37] py-2 rounded-lg hover:bg-[#d4af37] hover:text-black transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
