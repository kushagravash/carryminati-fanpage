import { useRef, useState } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import { officialChannels } from '../data/videos';

// The supplied, brief intro clip is stored locally; an owner may replace it with another same-site asset.
const configuredPath = import.meta.env.VITE_SIGNATURE_AUDIO_SRC?.trim();
const audioSrc = configuredPath
  ? (configuredPath.startsWith('/') && !configuredPath.startsWith('//') ? configuredPath : undefined)
  : '/audio/carryminati-intro.mp3';

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  if (!audioSrc) {
    return (
      <a className="audio-control audio-control--fallback" href={officialChannels.main} target="_blank" rel="noreferrer noopener">
        <span className="audio-control__icon"><Volume2 size={17} /></span>
        <span className="audio-control__copy"><strong>Signature voice</strong><small>No valid local clip configured · visit the official channel</small></span>
        <span className="audio-control__arrow">↗</span>
      </a>
    );
  }

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing || loading) {
      audio.pause();
      setPlaying(false);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setPlaybackError(false);
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaybackError(true);
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audio-control">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onPlaying={() => { setLoading(false); setPlaying(true); }}
        onWaiting={() => setLoading(true)}
        onEnded={() => { setLoading(false); setPlaying(false); }}
        onPause={() => { setLoading(false); setPlaying(false); }}
        onError={() => { setPlaybackError(true); setLoading(false); setPlaying(false); }}
      />
      <button className="audio-control__button" type="button" onClick={togglePlayback} aria-pressed={playing} aria-label={loading ? 'Loading signature audio' : playing ? 'Pause signature audio' : 'Play signature audio'}>
        {playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
      </button>
      <span className="audio-control__copy"><strong>Signature voice</strong><small role="status" aria-live="polite">{playbackError ? 'This local audio clip could not be played.' : loading ? 'Loading audio…' : playing ? 'Playing · “Toh Kaise hai aaplog?”' : 'Tap to hear “Toh Kaise hai aaplog?”'}</small></span>
    </div>
  );
}
