
import React, { useState, useEffect } from 'react';
import { Episode, Category } from '../types';

interface ContentFormProps {
  episode?: Episode | null;
  onSave: (episode: Partial<Episode>) => void;
  onClose: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ episode, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Episode>>({
    title: '',
    description: '',
    category: Category.PITCH,
    coverImage: 'https://picsum.photos/seed/new/800/600',
    host: 'Dr. Ricardo Ginga',
    duration: '15:00',
  });

  useEffect(() => {
    if (episode) setFormData(episode);
  }, [episode]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0a121e] border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-zoomIn">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-2xl font-premium font-bold text-[#d4af37]">
            {episode ? 'Editar Conteúdo' : 'Novo Conteúdo Executivo'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Título do Episódio</label>
              <input 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none focus:border-[#d4af37]"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Categoria</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none focus:border-[#d4af37]"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">URL da Capa (Imagem ou Vídeo)</label>
            <div className="flex gap-4">
              <input 
                className="flex-grow bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none focus:border-[#d4af37]"
                value={formData.coverImage}
                onChange={e => setFormData({...formData, coverImage: e.target.value})}
              />
              <button className="bg-slate-800 px-4 rounded-xl text-xs hover:bg-slate-700 transition-colors border border-slate-700">Upload</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Descrição</label>
            <textarea 
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none focus:border-[#d4af37]"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <div className="p-8 bg-slate-900/50 border-t border-slate-800 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 text-slate-400 font-bold hover:text-white transition-colors">Cancelar</button>
          <button 
            onClick={() => onSave(formData)}
            className="bg-[#d4af37] text-black px-10 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            {episode ? 'Guardar Alterações' : 'Publicar Conteúdo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentForm;
