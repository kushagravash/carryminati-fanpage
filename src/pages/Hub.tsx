import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AudioControl } from '../components/AudioControl';
import { ScrollReveal } from '../components/ScrollReveal';
import { VideoCard } from '../components/VideoCard';
import { officialChannels, videos } from '../data/videos';
import { setPageMeta } from '../lib/pageMeta';

const hero = videos.find((video) => video.id === 'unemployment-on-peak')!;
const comedy = videos.filter((video) => video.category === 'comedy');
const collabs = videos.filter((video) => video.category === 'collaboration');
const live = videos.filter((video) => video.category === 'gaming');
const music = videos.filter((video) => video.category === 'music');
const highPriorityImageHint = { fetchpriority: 'high' };

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="section-label"><span>{number}</span><span>{label}</span><i aria-hidden="true" /></div>;
}

export function HubPage() {
  const [heroFailed, setHeroFailed] = useState(false);

  useEffect(() => {
    setPageMeta('The Hub', 'An independent editorial fan archive across CarryMinati’s comedy, collaborations, CarryisLive and music.');
  }, []);

  return (
    <main className="page page--hub">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__frame">
          <div className="hero__image" aria-hidden="true">
            {!heroFailed ? (
              <img src={hero.thumbnailUrl} alt="" {...highPriorityImageHint} onError={() => setHeroFailed(true)} />
            ) : (
              <div className="hero__fallback"><span className="eyebrow">OFFICIAL SOURCE</span><strong>{hero.title}</strong></div>
            )}
            <span className="hero__image-caption">SOURCE FRAME / CARRYMINATI</span>
          </div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <span className="hero__kicker"><i /> AN INDEPENDENT FAN ARCHIVE</span>
            <p className="hero__creator">CARRYMINATI <span>/</span> Ajey Nagar</p>
            <h1 id="hero-title">THE ROAST.<br />THE ROOM.<br /><em>THE RHYTHM.</em></h1>
            <p className="hero__intro">Comedy, creator chemistry, live-game detours and music—filed from the many sides of CarryMinati’s public work.</p>
            <div className="hero__actions">
              <Link className="button button--light" to="/vault">Enter the Vault <ArrowRight size={16} /></Link>
              <a className="text-link text-link--light" href={officialChannels.main} target="_blank" rel="noreferrer noopener">Official channel <ArrowUpRight size={15} /></a>
            </div>
            <AudioControl />
          </div>
          <div className="hero__side-note"><span>01 — 04</span><span>COMEDY / CREW / LIVE / MUSIC</span></div>
        </div>
        <a className="scroll-cue" href="#roaster"><span>Scroll to enter</span><ArrowDown size={15} /></a>
      </section>

      <section id="roaster" className="story-section story-section--paper" aria-labelledby="roaster-heading">
        <div className="section-wrap">
          <SectionLabel number="01" label="THE ROASTER" />
          <ScrollReveal>
            <div className="section-heading section-heading--split">
              <h2 id="roaster-heading">A punchline<br /><em>with a point of view.</em></h2>
              <p>Roast energy is one chapter. Sketches, topical riffs and character-led comedy widen the frame.</p>
            </div>
          </ScrollReveal>
          <div className="video-layout video-layout--roaster">
            <ScrollReveal className="video-layout__lead"><VideoCard video={comedy[0]} /></ScrollReveal>
            <div className="video-layout__support">
              {comedy.slice(1, 3).map((video) => <ScrollReveal key={video.id}><VideoCard video={video} compact /></ScrollReveal>)}
              <Link className="inline-cta" to="/vault?category=comedy">All roasts & sketches <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section story-section--collab" aria-labelledby="collab-heading">
        <div className="section-wrap">
          <SectionLabel number="02" label="THE COLLABORATORS" />
          <ScrollReveal>
            <div className="collab-heading">
              <span className="collab-heading__stamp">NOT<br />A SOLO<br />ACT</span>
              <div><p className="eyebrow">THE GROUP FRAME</p><h2 id="collab-heading">The joke gets<br />bigger <em>together.</em></h2></div>
              <p className="collab-heading__note">Parody casts, creator meetups and shared scenes belong in the archive too. Names stay tied to the source credits.</p>
            </div>
          </ScrollReveal>
          <div className="collab-grid">
            <ScrollReveal className="collab-grid__feature"><VideoCard video={collabs[0]} /></ScrollReveal>
            <div className="collab-grid__rail">
              {collabs.slice(1).map((video) => <ScrollReveal key={video.id}><VideoCard video={video} compact /></ScrollReveal>)}
              <Link className="inline-cta inline-cta--light" to="/vault?category=collaboration">Explore group work <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="story-section story-section--live" aria-labelledby="live-heading">
        <div className="section-wrap">
          <SectionLabel number="03" label="CARRYISLIVE" />
          <ScrollReveal>
            <div className="section-heading section-heading--split section-heading--live">
              <div><p className="eyebrow">PLAY / REACT / RETURN</p><h2 id="live-heading">Different game.<br /><em>Same quick read.</em></h2></div>
              <p>CarryisLive has its own pace: gameplay, internet oddities and creator moments in the same channel universe.</p>
            </div>
          </ScrollReveal>
          <div className="video-layout video-layout--live">
            {live.slice(0, 3).map((video) => <ScrollReveal key={video.id}><VideoCard video={video} compact /></ScrollReveal>)}
          </div>
          <div className="live-footer"><span>MORE FROM THE LIVE CHANNEL</span><a href={officialChannels.gaming} target="_blank" rel="noreferrer noopener">Visit CarryisLive <ArrowUpRight size={15} /></a></div>
        </div>
      </section>

      <section className="story-section story-section--music" aria-labelledby="music-heading">
        <div className="section-wrap">
          <SectionLabel number="04" label="THE MUSICIAN" />
          <ScrollReveal>
            <div className="music-heading"><p className="eyebrow">A SHIFT IN TEMPO</p><h2 id="music-heading">Turn the frame.<br /><em>Let the track speak.</em></h2></div>
          </ScrollReveal>
          <div className="music-layout">
            <ScrollReveal className="music-layout__lead"><VideoCard video={music[2]} /></ScrollReveal>
            <div className="music-layout__rail">
              <p className="music-layout__intro">Official releases and credited collaborators, linked to their original videos. No re-uploads, no borrowed audio.</p>
              {music.slice(0, 2).map((video, index) => (
                <ScrollReveal key={video.id}>
                  <a className="track-row" href={video.videoUrl} target="_blank" rel="noreferrer noopener">
                    <span className="track-row__number">0{index + 1}</span><span className="track-row__copy"><strong>{video.title.split(' - ')[0]}</strong><small>CarryMinati × Wily Frenzy</small></span><ArrowUpRight size={17} />
                  </a>
                </ScrollReveal>
              ))}
              <Link className="inline-cta" to="/vault?category=music">Open the music shelf <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="community-cta" aria-labelledby="community-heading">
        <div className="community-cta__mark" aria-hidden="true">CA<span>·</span></div>
        <div><p className="eyebrow">THE ARCHIVE STAYS OPEN</p><h2 id="community-heading">Your corner<br /><em>of the internet.</em></h2></div>
        <p>Find a moment you remember, or add a contribution of your own. Independent fan project; submissions are reviewed, not published automatically.</p>
        <div className="community-cta__actions"><Link className="button button--light" to="/vault">Browse the Vault <ArrowRight size={16} /></Link><Link className="button button--outline-light" to="/submit">Make a submission <ArrowUpRight size={15} /></Link></div>
      </section>
    </main>
  );
}
