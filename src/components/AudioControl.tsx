import { useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { officialChannels } from '../data/videos';

// Playback is opt-in and accepts only a same-site asset authorized by the project owner.
const configuredPath = import.meta.env.VITE_SIGNATURE_AUDIO_SRC?.trim();
const audioSrc = configuredPath?.startsWith('/') && !configuredPath.startsWith('//')
  ? configuredPath
  : undefined;

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  if (!audioSrc) {
    return (
      <a className="audio-control audio-control--fallback" href={officialChannels.main} target="_blank" rel="noreferrer noopener">
        <span className="audio-control__icon"><Volume2 size={17} /></span>
        <span><strong>Signature voice</strong><small>No authorized local clip supplied · visit the official channel</small></span>
        <span className="audio-control__arrow">↗</span>
      </a>
    );
  }

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaybackError(false);
      setPlaying(true);
    } catch {
      setPlaybackError(true);
      setPlaying(false);
    }
  };

  return (
    <div className="audio-control">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaybackError(true); setPlaying(false); }}
      />
      <button className="audio-control__button" type="button" onClick={togglePlayback} aria-label={playing ? 'Pause signature audio' : 'Play signature audio'}>
        {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
      </button>
      <span><strong>Signature voice</strong><small role={playbackError ? 'status' : undefined}>{playbackError ? 'This local audio clip could not be played.' : playing ? 'Playing · “Toh Kaise hai aaplog?”' : 'Tap to hear “Toh Kaise hai aaplog?”'}</small></span>
    </div>
  );
}
