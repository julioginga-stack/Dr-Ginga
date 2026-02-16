
import React, { useState } from 'react';

interface ProfileProps {
  user: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  onUpdate: (newData: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [bio, setBio] = useState(user.bio);

  const avatars = [
    'https://i.pravatar.cc/150?u=ginga',
    'https://i.pravatar.cc/150?u=ana',
    'https://i.pravatar.cc/150?u=marcus',
    'https://i.pravatar.cc/150?u=executive1'
  ];

  const handleSave = () => {
    onUpdate({ name, avatar, bio });
    alert('Identidade visual atualizada com sucesso!');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <h2 className="text-4xl font-premium font-bold mb-8">Personalizar Identidade</h2>
      
      <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-[#d4af37] p-1 overflow-hidden transition-transform group-hover:scale-105">
                <img src={avatar} className="w-full h-full rounded-full object-cover" alt="Avatar Atual" />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs font-bold text-[#d4af37]">ALTERAR</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Avatar do Podcast</p>
          </div>

          <div className="flex-grow space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Nome do Host / Podcast</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-[#d4af37] outline-none text-white font-premium text-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Bio Executiva</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-[#d4af37] outline-none text-slate-300 leading-relaxed"
              />
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Escolher Avatar Pré-definido</p>
              <div className="flex gap-4">
                {avatars.map((av, i) => (
                  <button 
                    key={i} 
                    onClick={() => setAvatar(av)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${avatar === av ? 'border-[#d4af37] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}
                  >
                    <img src={av} className="w-full h-full rounded-full object-cover" alt={`Opção ${i}`} />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="mt-8 bg-[#d4af37] text-black px-10 py-4 rounded-2xl font-bold hover:bg-[#c4a030] transition-colors shadow-xl"
            >
              Guardar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
