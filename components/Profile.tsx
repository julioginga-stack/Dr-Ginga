
import React, { useState, useRef } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatars = [
    'https://i.pravatar.cc/150?u=ginga',
    'https://i.pravatar.cc/150?u=ana',
    'https://i.pravatar.cc/150?u=marcus',
    'https://i.pravatar.cc/150?u=executive1'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate({ name, avatar, bio });
    alert('Identidade visual e foto pessoal atualizadas com sucesso!');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto mb-20">
      <h2 className="text-4xl font-premium font-bold mb-8">Personalizar Identidade</h2>
      
      <div className="bg-[#0a121e] border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-[#d4af37] p-1 overflow-hidden transition-transform group-hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <img src={avatar} className="w-full h-full rounded-full object-cover" alt="Avatar Atual" />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-2 border-dashed border-[#d4af37]/50"
              >
                <svg className="w-8 h-8 text-[#d4af37] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">Mudar Foto</span>
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sua Foto Pessoal</p>
          </div>

          <div className="flex-grow space-y-6 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome Executivo</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-[#d4af37] outline-none text-white font-premium text-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bio Corporativa</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-[#d4af37] outline-none text-slate-300 leading-relaxed"
              />
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ou escolha um Avatar Premium</p>
              <div className="flex flex-wrap gap-4">
                {avatars.map((av, i) => (
                  <button 
                    key={i} 
                    onClick={() => setAvatar(av)}
                    className={`w-14 h-14 rounded-full border-2 transition-all overflow-hidden ${avatar === av ? 'border-[#d4af37] scale-110 shadow-lg' : 'border-slate-800 hover:border-slate-600'}`}
                  >
                    <img src={av} className="w-full h-full object-cover" alt={`Avatar ${i}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button 
                onClick={handleSave}
                className="bg-[#d4af37] text-black px-12 py-4 rounded-2xl font-bold hover:bg-[#c4a030] transition-colors shadow-2xl flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Guardar Identidade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
