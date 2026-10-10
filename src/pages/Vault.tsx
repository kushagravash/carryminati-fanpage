import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { VideoCard } from '../components/VideoCard';
import { categoryLabels, videos, type ContentCategory } from '../data/videos';
import { setPageMeta } from '../lib/pageMeta';

const categories: Array<{ id: 'all' | ContentCategory; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'comedy', label: categoryLabels.comedy },
  { id: 'collaboration', label: categoryLabels.collaboration },
  { id: 'gaming', label: categoryLabels.gaming },
  { id: 'music', label: categoryLabels.music },
];

const validCategoryIds = new Set(categories.map((category) => category.id));

export function VaultPage() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const paramCategory = params.get('category') as 'all' | ContentCategory | null;
  const active = paramCategory && validCategoryIds.has(paramCategory) ? paramCategory : 'all';
  const featured = videos.find((video) => video.featured);

  useEffect(() => {
    setPageMeta('Stream Vault', 'A curated CarryMinati and CarryisLive archive: roasts, sketches, creator collaborations, gaming and music.');
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return videos.filter((video) => {
      const matchesCategory = active === 'all' || video.categories.includes(active);
      const haystack = [video.title, video.creatorChannel, video.shortDescription, ...video.collaborators, video.collaboratorNote ?? ''].join(' ').toLocaleLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [active, search]);

  const showFeatured = active === 'all' && !search.trim() && featured;
  const gridItems = showFeatured ? filtered.filter((video) => video.id !== featured.id) : filtered;

  const chooseCategory = (id: 'all' | ContentCategory) => {
    const next = new URLSearchParams(params);
    if (id === 'all') next.delete('category');
    else next.set('category', id);
    setParams(next, { replace: false });
  };

  return (
    <main className="page page--vault">
      <section className="page-intro page-intro--vault">
        <div className="page-intro__index">02 <span>/</span> STREAM VAULT</div>
        <p className="eyebrow">THE CURATED ARCHIVE</p>
        <h1>THE<br /><em>ARCHIVE.</em></h1>
        <div className="page-intro__foot"><p>Roasts. Streams. Music. Collaborations. The moments stay attached to their source.</p><span>{videos.length} VERIFIED SOURCE LINKS</span></div>
      </section>

      <section className="vault-content" aria-label="Video archive">
        {showFeatured && (
          <div className="vault-featured">
            <div className="vault-featured__label"><span className="eyebrow">EDITOR'S ENTRY</span><span>01 — COLLABORATORS</span></div>
            <div className="vault-featured__card"><VideoCard video={featured} /></div>
            <div className="vault-featured__aside"><span className="display-number">01</span><p>A creator-cast parody from the official CarryMinati channel. The archive leads with shared scenes, not just solo uploads.</p><Link className="text-link" to="/vault?category=collaboration">See collaboration entries <ArrowRight size={14} /></Link></div>
          </div>
        )}

        <div className="vault-tools">
          <div className="vault-tools__heading"><SlidersHorizontal size={16} /><span>FILTER THE ARCHIVE</span></div>
          <div className="category-filters" role="group" aria-label="Filter videos by category">
            {categories.map((category) => (
              <button key={category.id} className={`filter-chip${active === category.id ? ' is-active' : ''}`} type="button" aria-pressed={active === category.id} onClick={() => chooseCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </div>
          <label className="vault-search"><Search size={16} /><span className="sr-only">Search titles and descriptions</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search titles, creators, moments" /></label>
        </div>

        <div className="vault-grid-status"><span>{active === 'all' ? 'ALL CONTENT' : categoryLabels[active].toUpperCase()}</span><span>{filtered.length} {filtered.length === 1 ? 'ENTRY' : 'ENTRIES'}</span></div>
        {gridItems.length ? (
          <div className="vault-grid">{gridItems.map((video, index) => <div key={video.id} className={`vault-grid__item vault-grid__item--${index % 5}`}><VideoCard video={video} /></div>)}</div>
        ) : (
          <div className="empty-state"><span className="eyebrow">NOT IN THIS BOX</span><h2>No matching entries.</h2><p>Try another category or a shorter search.</p><button type="button" className="inline-cta" onClick={() => { setSearch(''); chooseCategory('all'); }}>Clear filters <ArrowRight size={15} /></button></div>
        )}
      </section>
    </main>
  );
}
