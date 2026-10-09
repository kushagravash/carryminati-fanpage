import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { categoryLabels, type VideoItem } from '../data/videos';

type VideoCardProps = {
  video: VideoItem;
  compact?: boolean;
};

export function VideoCard({ video, compact = false }: VideoCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const category = categoryLabels[video.category];

  return (
    <article className={`video-card${compact ? ' video-card--compact' : ''}`}>
      <a
        className="video-card__link"
        href={video.videoUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Watch ${video.title} on YouTube`}
      >
        <div className={`video-card__media${imageFailed ? ' is-fallback' : ''}`}>
          {!imageFailed && (
            <img
              src={video.thumbnailUrl}
              alt={`Official thumbnail for ${video.title}`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}
          {imageFailed && (
            <div className="video-card__placeholder" aria-hidden="true">
              <span className="eyebrow">{video.creatorChannel}</span>
              <span className="placeholder-title">{video.title}</span>
            </div>
          )}
          {!imageFailed && <span className="video-card__play" aria-hidden="true"><Play size={16} fill="currentColor" /></span>}
          {video.featured && <span className="video-card__index">01</span>}
        </div>
        <div className="video-card__body">
          <div className="video-card__meta">
            <span>{category}</span>
            <span>{video.creatorChannel}</span>
          </div>
          <h3>{video.title}</h3>
          {video.collaboratorNote && <p className="video-card__collab">{video.collaboratorNote}</p>}
          {video.collaborators.length > 0 && <p className="video-card__collab">With {video.collaborators.join(', ')}</p>}
          {!compact && <p className="video-card__description">{video.shortDescription}</p>}
          <span className="video-card__watch">Watch original <ArrowUpRight size={14} /></span>
        </div>
      </a>
    </article>
  );
}
