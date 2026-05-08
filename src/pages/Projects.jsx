import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROJECTS_LIST, PROJECT_CATEGORIES, CMS_CONFIG, CORAL_REGISTRY } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('cat') || 'coral'
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [archiveTab, setArchiveTab] = useState('image') // 'image' or 'video'

  const handleTabChange = (catId) => {
    setSearchParams({ cat: catId })
  }

  const heroImages = useMemo(() => {
    return MANIFEST.slideshow.length > 0 
      ? [...MANIFEST.slideshow].reverse().map(m => m.startsWith('/') ? m : `/deep-archives/Focus/${m}`)
      : ['/deep-archives/Focus/Adopt/AX1/GPDR2636.JPG', '/deep-archives/Focus/Adopt/AX1/GPDR2637.JPG', '/deep-archives/Focus/Adopt/AX1/GPDR2638.JPG']
  }, [])

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages])

  const allMedia = useMemo(() => {
    return [...MANIFEST.archives].reverse().map(m => m.startsWith('/') ? m : `/deep-archives/Focus/${m}`)
  }, [])

  const coralSliderFrames = useMemo(() => {
    const defaultFrames = [
      '/deep-archives/Focus/Adopt/AX1/GPDR2636.JPG',
      '/deep-archives/Focus/Adopt/AX1/GPDR2637.JPG',
      '/deep-archives/Focus/Adopt/AX1/GPDR2638.JPG'
    ];
    const available = allMedia.filter(m => !heroImages.includes(m) && m.toLowerCase().includes('coral'))
    
    const selected = available.slice(0, 3);
    while (selected.length < 3) {
      selected.push(defaultFrames[selected.length]);
    }
    return selected;
  }, [allMedia, heroImages])

  const [currentArchiveIdx, setCurrentArchiveIdx] = useState(0)

  const tabMedia = useMemo(() => {
    const keywords = activeTab === 'coral' ? ['focus', 'adopt', 'coral'] 
                  : activeTab === 'sweep' ? ['puls', 'clean', 'sweep', 'debris', 'harbor'] 
                  : ['aware', 'edu', 'workshop', 'flyer', 'docs'];
    
    let filtered = allMedia.filter(m => {
      const path = m.toLowerCase();
      const match = keywords.some(k => path.includes(k));
      return match; // Removed !heroImages.includes(m) to ensure all project images show up
    });
    
    if (activeTab === 'coral') {
      filtered = filtered.filter(m => !coralSliderFrames.includes(m))
    }
    return filtered.length > 0 ? filtered : allMedia.slice(0, 20)
  }, [activeTab, allMedia, coralSliderFrames])

  useEffect(() => {
    setCurrentArchiveIdx(0)
  }, [activeTab])

  // Coral Restoration specific interactive slide frame
  const CoralRestorationSlider = () => {
    const [frameIdx, setFrameIdx] = useState(0);
    return (
      <div className="featured-media-frame" style={{ marginTop: '30px', position: 'relative' }}>
        <div className="featured-media-inner">
          <img src={coralSliderFrames[frameIdx]} alt="Coral Restoration Slide" />
          <div className="pulse-tag">
            <span className="live-dot" /> <span>INTERACTIVE FRAME</span>
          </div>
          {coralSliderFrames.length > 1 && (
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px', zIndex: 10 }}>
              <button onClick={() => setFrameIdx(prev => (prev > 0 ? prev - 1 : coralSliderFrames.length - 1))} className="btn btn-outline btn-sm" style={{ padding: '8px 16px', background: 'rgba(2,11,24,0.8)' }}>{'<'}</button>
              <button onClick={() => setFrameIdx(prev => (prev < coralSliderFrames.length - 1 ? prev + 1 : 0))} className="btn btn-outline btn-sm" style={{ padding: '8px 16px', background: 'rgba(2,11,24,0.8)' }}>{'>'}</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const activeCatObj = PROJECT_CATEGORIES.find(c => c.id === activeTab)
  const filteredProjects = PROJECTS_LIST.filter(p => p.category === activeTab).slice(0, 3)

  // Helper to count files in a folder path
  const getResourceCount = (folderPath) => {
    if (!folderPath) return 0;
    // Match files that start with the folderPath
    const count = MANIFEST.archives.filter(path => path.includes(folderPath)).length;
    return count;
  };

  // Featured Media Slider that prioritizes videos from the latest 3 projects
  const FeaturedMediaSlider = () => {
    const [mediaIdx, setMediaIdx] = useState(0);
    
    // Get videos for the projects currently shown in the category
    const projectVideos = useMemo(() => {
      const vids = [];
      filteredProjects.forEach(p => {
        const folderVids = MANIFEST.archives.filter(m => 
          m.toLowerCase().endsWith('.mp4') && m.includes(p.folderPath)
        ).map(m => ({ type: 'local', path: m, project: p.title }));
        vids.push(...folderVids);
      });
      
      // Fallback to drive videos if no local project videos found
      if (vids.length === 0) {
        const driveVids = (MANIFEST.videos || []).map(v => ({ type: 'drive', path: v.path, project: 'Mission Archive' }));
        vids.push(...driveVids);
      }
      
      // Add images as fallback
      const categoryImages = tabMedia.map(m => ({ type: 'image', path: m }));
      return [...vids, ...categoryImages];
    }, [filteredProjects]);

    const nextMedia = () => setMediaIdx(prev => (prev + 1) % projectVideos.length);
    const prevMedia = () => setMediaIdx(prev => (prev > 0 ? prev - 1 : projectVideos.length - 1));

    const currentMedia = projectVideos[mediaIdx];

    return (
      <div className="featured-media-frame" style={{ marginTop: '0', position: 'relative' }}>
        <div className="featured-media-inner">
          {currentMedia?.type === 'local' ? (
            <video src={currentMedia.path} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : currentMedia?.type === 'drive' ? (
            <iframe src={currentMedia.path} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay" />
          ) : (
            <img src={currentMedia?.path || heroImages[0]} alt="Featured Mission" />
          )}
          
          <div className="pulse-tag">
            <span className="live-dot" /> <span>{currentMedia?.type === 'image' ? 'LATEST CAPTURE' : `CLIP: ${currentMedia?.project || 'UPDATE'}`}</span>
          </div>

          {projectVideos.length > 1 && (
            <div style={{ position: 'absolute', bottom: '40px', right: '40px', display: 'flex', gap: '20px', zIndex: 10 }}>
              <button onClick={prevMedia} className="btn btn-outline" style={{ 
                width: '80px', height: '80px', borderRadius: '50%', padding: '0', 
                background: 'rgba(2,11,24,0.95)', fontSize: '2rem', fontWeight: 'bold',
                border: '2px solid var(--teal)', boxShadow: '0 0 20px rgba(13,211,197,0.3)'
              }}>{'<'}</button>
              <button onClick={nextMedia} className="btn btn-outline" style={{ 
                width: '80px', height: '80px', borderRadius: '50%', padding: '0', 
                background: 'rgba(2,11,24,0.95)', fontSize: '2rem', fontWeight: 'bold',
                border: '2px solid var(--teal)', boxShadow: '0 0 20px rgba(13,211,197,0.3)'
              }}>{'>'}</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="projects-page">
      {/* 1. CINEMATIC HERO SLIDESHOW */}
      <section className="projects-hero section" style={{ position: 'relative', overflow: 'hidden', padding: '180px 0 120px', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {heroImages.map((img, idx) => (
          <div key={idx} style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: idx === currentSlide ? 0.6 : 0,
            transition: 'opacity 1.5s ease-in-out',
            transform: idx === currentSlide ? 'scale(1.05)' : 'scale(1)',
            filter: 'brightness(0.7) contrast(1.1)'
          }} />
        ))}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, rgba(2,11,24,0.4) 50%, var(--ocean-deep) 100%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge animate-reveal" style={{ marginBottom: '24px', background: 'rgba(13,211,197,0.2)', borderColor: 'var(--teal)', color: 'white' }}>🌊 MISSION LOG</div>
          <h1 className="section-title animate-reveal" style={{ fontSize: '4.8rem', marginBottom: '20px', textAlign: 'center', width: '100%' }}>
            Deep Sea <span className="gradient-text">Frontlines</span>
          </h1>
          <p className="section-sub animate-reveal" style={{ margin: '0 auto', maxWidth: '800px', textAlign: 'center' }}>
            Live archives from our Hinnavaru conservation sites. From coral nurseries to waste management — the data of resilience.
          </p>
        </div>
      </section>

      {/* 2. EXPLORATION INTERFACE */}
      <section className="section-sm" style={{ background: 'var(--ocean-deep)', paddingTop: '40px', paddingBottom: '0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div className="badge badge-teal animate-reveal" style={{ display: 'inline-block', padding: '10px 25px', fontSize: '0.9rem' }}>PROJECTS UPDATE</div>
          </div>
          <div className="mockup-tab-nav">
            {PROJECT_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`mockup-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => handleTabChange(cat.id)}
              >
                {cat.emoji} {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE DISPLAY FRAME */}
      <section className="section-sm" style={{ background: 'var(--ocean-deep)', paddingTop: '20px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="featured-mission-container animate-reveal" key={activeTab}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <span className="live-dot" /> <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--teal)' }}>DATA SYNC: {MANIFEST.last_sync ? new Date(MANIFEST.last_sync).toLocaleDateString() : 'STABLE'}</span>
              </div>
            </div>
            
            <FeaturedMediaSlider />

            <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {filteredProjects.map((p, i) => {
                const projectFiles = MANIFEST.archives.filter(path => path.includes(p.folderPath));
                const mediaSrc = projectFiles.length > 0 
                  ? projectFiles[Math.floor(Math.random() * projectFiles.length)] 
                  : (tabMedia[i % tabMedia.length] || heroImages[0]);
                
                const isVideo = mediaSrc.toLowerCase().endsWith('.mp4');
                const fileCount = projectFiles.length;

                return (
                  <div key={i} className="card animate-reveal" style={{ background: 'rgba(255,255,255,0.02)', padding: '0', cursor: 'pointer', overflow: 'hidden' }} onClick={() => setSelectedProject(p)}>
                    {isVideo ? (
                      <video src={mediaSrc} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} autoPlay loop muted playsInline />
                    ) : (
                      <img src={mediaSrc} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} alt={p.title} />
                    )}
                    <div style={{ padding: '30px' }}>
                      <div className="badge badge-teal" style={{ marginBottom: '15px', fontWeight: 800 }}>
                        {fileCount > 0 ? `${fileCount} TOTAL RESOURCES` : 'COMING SOON'}
                      </div>
                      <h4 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'white' }}>{p.title}</h4>
                      <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.6' }}>{p.desc.substring(0, 100)}...</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                         <span style={{ fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 800 }}>MISSION SYNCED</span>
                         <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', flex: 1, marginLeft: '15px', borderRadius: '2px' }}>
                            <div style={{ width: fileCount > 0 ? '100%' : '0%', height: '100%', background: 'var(--teal)', borderRadius: '2px' }} />
                         </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal glass-card deep-dive-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className={`badge ${selectedProject.badgeClass}`} style={{ marginBottom: '8px' }}>
                  {selectedProject.emoji} {selectedProject.badge}
                </div>
                <h3 className="gradient-text">{selectedProject.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="modal-content">
              <div className="deep-dive-grid">
                <div className="deep-dive-main">
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    {selectedProject.desc}
                  </p>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <div className="funding-stats-dash">
                      <span className="gradient-text" style={{ fontSize: '2.5rem' }}>{getResourceCount(selectedProject.folderPath)}</span>
                      <span style={{ marginLeft: '12px', fontSize: '0.9rem' }}>Total mission resources archived.</span>
                    </div>
                    <div className="progress-bar" style={{ height: '12px' }}>
                      <div className="progress-fill" style={{ width: getResourceCount(selectedProject.folderPath) > 0 ? '100%' : '0%' }} />
                    </div>
                  </div>
                </div>
                <div className="deep-dive-side">
                   <div className="mini-card" style={{ marginBottom: '12px' }}>
                     <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>LOCALE</div>
                     <div style={{ fontWeight: 800 }}>{CMS_CONFIG.atoll} Lagoon</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MISSION ARCHIVE (Gallery) */}
      <section className="section" id="archive" style={{ background: 'var(--ocean-deep)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-teal" style={{ marginBottom: '16px' }}>📸 Mission Archive</div>
            <h2 className="section-title">Visual <span className="gradient-text">Bulletins</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Synchronized high-resolution captures from the Hinnavaru lagoon and field operations.</p>
          </div>

          <div className="mockup-tab-nav" style={{ marginBottom: '40px' }}>
            <button 
              className={`mockup-tab-btn ${archiveTab === 'image' ? 'active' : ''}`}
              onClick={() => setArchiveTab('image')}
            >
              📷 Images
            </button>
            <button 
              className={`mockup-tab-btn ${archiveTab === 'video' ? 'active' : ''}`}
              onClick={() => setArchiveTab('video')}
            >
              🎥 Videos
            </button>
          </div>

          {archiveTab === 'image' && (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '20px' 
              }}>
                {MANIFEST.archives.slice(0, 12).map((img, i) => (
                  <div key={i} className="card" style={{ padding: '0', overflow: 'hidden', height: '240px', position: 'relative', cursor: 'zoom-in' }}>
                    <img 
                      src={img.startsWith('/') ? img : `/deep-archives/Focus/${img}`} 
                      alt={`Mission update ${i}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }} 
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', fontSize: '0.7rem', opacity: 0.8 }}>
                      FILE: {img.split('/').pop().split('.')[0]}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <a href={`https://drive.google.com/drive/folders/${CMS_CONFIG.media_automation.images_id}`} target="_blank" rel="noopener" className="btn btn-outline">More Options →</a>
              </div>
            </>
          )}

          {archiveTab === 'video' && (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '20px' 
              }}>
                {(MANIFEST.videos || []).slice(0, 6).map((vid, i) => (
                  <div key={i} className="card" style={{ padding: '0', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,107,107,0.3)' }}>
                    {vid.path && vid.path.includes('drive.google.com') ? (
                      <iframe 
                        src={vid.path} 
                        style={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 'none' }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        controls 
                        style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
                        poster="/deep-archives/Focus/Adopt/AX1/GPDR2636.JPG"
                      >
                        <source src={vid.path} type="video/mp4" />
                      </video>
                    )}
                    <div style={{ padding: '15px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{vid.name}</div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '4px' }}>MISSION SIG: {vid.id?.substring(0,8)}</div>
                    </div>
                  </div>
                ))}
                {(!MANIFEST.videos || MANIFEST.videos.length === 0) && (
                  <p style={{ textAlign: 'center', width: '100%', opacity: 0.7 }}>No video captures available yet.</p>
                )}
              </div>
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <a href={`https://drive.google.com/drive/folders/${CMS_CONFIG.media_automation.vids_id}`} target="_blank" rel="noopener" className="btn btn-outline">More Options →</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. NURSERY DIRECTORY (Reef Guardians) */}
      <section className="section" style={{ background: '#020b18', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <div className="badge badge-teal" style={{ marginBottom: '12px' }}>🛡️ Nursery Directory</div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Active <span className="gradient-text">Guardians</span></h2>
            </div>
            <Link to="/registry" className="btn btn-outline btn-sm">Full Registry →</Link>
          </div>

          <div className="guardian-slider-wrap">
            <div className="guardian-slider-inner" id="guardian-slider">
               {CORAL_REGISTRY.slice(0, 10).map((c, i) => (
                 <div key={i} className="guardian-slide-card card" style={{ minWidth: '220px', padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🪸</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--teal)', marginBottom: '4px' }}>{c.id}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', minHeight: '2.4em' }}>{c.species}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Guardian: {c.adopter}</div>
                    <div className="progress-bar" style={{ marginTop: '16px', height: '4px' }}>
                      <div className="progress-fill" style={{ width: `${c.survival}%` }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '30px', justifyContent: 'center' }}>
            <button onClick={() => document.getElementById('guardian-slider').scrollBy({ left: -250, behavior: 'smooth' })} className="btn btn-outline" style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}>{'<'}</button>
            <button onClick={() => document.getElementById('guardian-slider').scrollBy({ left: 250, behavior: 'smooth' })} className="btn btn-outline" style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0 }}>{'>'}</button>
          </div>
        </div>
      </section>

      <style>{`
        .mockup-tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid rgba(255,255,255,0.05);
          justify-content: center;
        }
        .mockup-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 20px 30px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .mockup-tab-btn.active {
          color: var(--teal);
        }
        .mockup-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--teal);
          box-shadow: 0 0 15px var(--teal);
        }
        .guardian-slider-wrap {
          overflow-x: auto;
          padding: 20px 0 40px;
          margin: 0 -20px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .guardian-slider-wrap::-webkit-scrollbar { display: none; }
        .guardian-slider-inner {
          display: flex;
          gap: 20px;
          padding: 0 20px;
        }
        .guardian-slide-card {
          flex: 0 0 auto;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s;
        }
        .guardian-slide-card:hover { transform: translateY(-5px); border-color: var(--teal); }
        .featured-mission-container {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 30px;
          padding: 60px;
          backdrop-filter: blur(20px);
        }
        .featured-media-frame {
          position: relative;
          padding: 15px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(13,211,197,0.3);
          border-radius: 30px;
        }
        .featured-media-inner {
          position: relative;
          aspect-ratio: 21/9;
          border-radius: 20px;
          overflow: hidden;
        }
        .featured-media-inner img { width: 100%; height: 100%; object-fit: cover; }
        .pulse-tag {
          position: absolute;
          top: 25px;
          right: 25px;
          background: rgba(0,0,0,0.6);
          padding: 10px 20px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--teal);
          font-size: 0.75rem;
          font-weight: 900;
        }
        .mini-card {
           background: rgba(255,255,255,0.03);
           padding: 16px;
           border-radius: 12px;
           border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  )
}
