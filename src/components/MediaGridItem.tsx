import React, { useState } from 'react';
import { Loader2, ZoomIn, Play, Award, ImageOff } from 'lucide-react';

interface LazyMediaImageProps {
  src: string;
  alt: string;
  className?: string;
  containerHeight?: string | number;
  fallbackSrc?: string;
  onClick?: () => void;
  aspectRatio?: string;
}

export const LazyMediaImage: React.FC<LazyMediaImageProps> = ({
  src,
  alt,
  className = '',
  containerHeight,
  fallbackSrc,
  onClick,
  aspectRatio
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // If src changes, reset loading state
  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <div 
      className="relative overflow-hidden w-full bg-[#131720]"
      style={{
        height: containerHeight,
        aspectRatio: aspectRatio,
        minHeight: containerHeight || (aspectRatio ? undefined : '200px')
      }}
      onClick={onClick}
    >
      {/* Loading Skeleton & Spinner Placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#121620] via-[#181d2a] to-[#0f131a] z-10 select-none animate-pulse"
          style={{ transition: 'opacity 0.3s ease' }}
        >
          <div className="relative flex items-center justify-center">
            <Loader2 
              className="w-7 h-7 text-[#ffd700] animate-spin" 
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' }}
            />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-[#ffd700]/70 tracking-wider uppercase">
            Loading Media...
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151922] text-[#888] p-4 text-center">
          <ImageOff className="w-8 h-8 text-[#d9a727]/60 mb-2" />
          <span className="text-xs font-medium text-gray-400 line-clamp-1">{alt || 'Image Preview'}</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            } else {
              setIsLoading(false);
              setHasError(true);
            }
          }}
          className={`${className} transition-opacity duration-500 ease-out ${
            isLoading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
    </div>
  );
};

interface VisualMediaCardProps {
  id: string | number;
  url: string;
  title: string;
  productLabel?: string;
  fallbackSvg?: string;
  onOpenZoom: () => void;
}

export const VisualMediaCard: React.FC<VisualMediaCardProps> = ({
  url,
  title,
  productLabel,
  fallbackSvg,
  onOpenZoom
}) => {
  return (
    <div 
      className="visual-asset-card" 
      onClick={onOpenZoom}
      title="Click to view full image in lightbox viewer"
    >
      {productLabel && (
        <div className="visual-asset-sector-tag">
          {productLabel}
        </div>
      )}

      <LazyMediaImage
        src={url}
        alt={title}
        containerHeight={220}
        fallbackSrc={fallbackSvg}
        className="visual-asset-img"
      />

      <div className="visual-asset-zoom-tag">
        <ZoomIn size={16} />
      </div>
      <div className="visual-asset-overlay">
        <div className="visual-asset-title">{title}</div>
      </div>
    </div>
  );
};

interface VideoMediaCardProps {
  vid: {
    id?: string | number;
    url: string;
    title: string;
    desc?: string;
    thumb?: string;
    productLabel?: string;
  };
  onPlay: (url: string, title: string) => void;
  watchText?: string;
}

export const VideoMediaCard: React.FC<VideoMediaCardProps> = ({
  vid,
  onPlay,
  watchText = 'Watch Video'
}) => {
  const thumbUrl = vid.thumb || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800";

  return (
    <div className="video-asset-card">
      <div 
        className="video-asset-thumb-wrap relative"
        onClick={() => onPlay(vid.url, vid.title)}
      >
        <LazyMediaImage
          src={thumbUrl}
          alt={vid.title}
          containerHeight={200}
          fallbackSrc="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800"
          className="video-asset-thumb"
        />
        <div className="video-play-btn-circle">
          <div className="play-icon-inner">
            <Play size={24} fill="#000000" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      </div>
      <div className="video-asset-body">
        {vid.productLabel && (
          <div style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            {vid.productLabel}
          </div>
        )}
        <h3 className="video-asset-title">{vid.title}</h3>
        {vid.desc && <p className="video-asset-desc">{vid.desc}</p>}
        <button 
          className="btn btn-dark" 
          style={{ padding: '8px 16px', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}
          onClick={() => onPlay(vid.url, vid.title)}
        >
          <Play size={14} fill="currentColor" /> {watchText}
        </button>
      </div>
    </div>
  );
};

interface CredentialMediaCardProps {
  cred: {
    id?: string | number;
    url: string;
    title: string;
    desc?: string;
  };
  onOpenZoom: () => void;
  fallbackSvg?: string;
}

export const CredentialMediaCard: React.FC<CredentialMediaCardProps> = ({
  cred,
  onOpenZoom,
  fallbackSvg
}) => {
  return (
    <div 
      className="visual-asset-card" 
      onClick={onOpenZoom}
      title="Click to view full certificate"
      style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
    >
      <div className="visual-asset-sector-tag" style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold)' }}>
        <Award size={12} style={{ display: 'inline', marginRight: '4px' }} /> Certified
      </div>

      <LazyMediaImage
        src={cred.url}
        alt={cred.title}
        containerHeight={220}
        fallbackSrc={fallbackSvg}
        className="visual-asset-img"
      />

      <div className="visual-asset-zoom-tag">
        <ZoomIn size={16} />
      </div>
      <div className="visual-asset-overlay">
        <div className="visual-asset-title">{cred.title}</div>
        {cred.desc && <div style={{ fontSize: '0.75rem', color: '#d4d4d4', marginTop: '4px' }}>{cred.desc}</div>}
      </div>
    </div>
  );
};
