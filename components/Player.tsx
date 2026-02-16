
import React, { useState, useRef, useEffect } from 'react';
import { Episode } from '../types';

interface PlayerProps {
  episode: Episode | null;
}

const Player: React.FC<PlayerProps> = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (episode) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [episode]);

  if (!episode) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a121e]/95 backdrop-blur-xl border-t border-slate-800 z-50 p-4 md:px-12 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Current Episode Info */}
      <div className="flex items-center gap-4 w-full md:w-1/4">
        <img src={episode.coverImage} alt={episode.title} className="w-14 h-14 rounded-lg object-cover shadow-lg border border-slate-700" />
        <div className="truncate">
          <h4 className="font-bold text-sm truncate">{episode.title}</h4>
          <p className="text-xs text-slate-400 truncate">{episode.host}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full md:w-1/2 gap-1">
        <div className="flex items-center gap-8">
          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full max-w-lg">
          <span className="text-[10px] text-slate-500 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
          />
          <span className="text-[10px] text-slate-500 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Extra Actions */}
      <div className="flex items-center justify-end gap-6 w-full md:w-1/4">
        <button 
          onClick={changeSpeed}
          className="text-xs font-bold text-[#d4af37] border border-[#d4af37]/30 px-2 py-1 rounded hover:bg-[#d4af37]/10 transition-colors"
        >
          {playbackRate}x
        </button>
        <button className="text-slate-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Player;
