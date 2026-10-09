import { ArrowUpRight } from 'lucide-react';
import { officialChannels } from '../data/videos';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand"><span className="site-mark" aria-hidden="true">CA<span>·</span></span><span>Carry Archive</span></div>
      <p>An independent fan project. Not affiliated with or operated by CarryMinati.</p>
      <a href={officialChannels.linkHub} target="_blank" rel="noreferrer noopener">Official links <ArrowUpRight size={14} /></a>
    </footer>
  );
}
