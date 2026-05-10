import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROJECTS_LIST, PROJECT_CATEGORIES, CMS_CONFIG, CORAL_REGISTRY } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('cat') || 'coral'
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [archiveTab, setArchiveTab] = useState('image')
  const [galleryPage, setGalleryPage] = useState(0)
  const [lightboxData, setLightboxData] = useState(null) // { images: [], index: 0, title: '' }

  const handleTabChange = (catId) => {
    setSearchParams({ cat: catId })
    setGalleryPage(0)
  }

  // 1. Optimized Hero Images (Performance)
  const heroImages = useMemo(() => {
    return MANIFEST.slideshow.length > 0 
      ? [...MANIFEST.slideshow].reverse().map(m => m.startsWith('/') ? m : `/deep-archives/Focus/${m}`)
      : ['/deep-archives/Focus/Adopt/AX1/GPDR2636.JPG']
  }, [])

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 10000) // Much slower for stability
    return () => clearInterval(timer)
  }, [heroImages])

  const allMedia = useMemo(() => {
    return [...MANIFEST.archives].reverse().map(m => m.startsWith('/') ? m : `/deep-archives/Focus/${m}`)
  }, [])

  // 2. Advanced Project-Based Sorting
  const projectAlbums = useMemo(() => {
    const albums = {};
    
    // Core Project Albums
    PROJECTS_LIST.forEach(p => {
      albums[p.title] = {
        title: p.title,
        category: p.category,
        images: allMedia.filter(m => m.includes(p.folderPath) || m.toLowerCase().includes(p.title.toLowerCase().replace(' ', '_'))),
        cover: null
      };
    });

    // Special Catch-All Albums for user-mentioned folders
    const sweeperImgs = allMedia.filter(m => m.toLowerCase().includes('sweeper') || m.toLowerCase().includes('sweep'));
    if (sweeperImgs.length > 0) {
      albums['Sweeper Effects'] = { title: 'Sweeper Effects', category: 'sweep', images: sweeperImgs, cover: sweeperImgs[0] };
    }

    const eduImgs = allMedia.filter(m => m.toLowerCase().includes('edu') || m.toLowerCase().includes('aware') || m.toLowerCase().includes('page'));
    if (eduImgs.length > 0) {
      albums['Edu Pages'] = { title: 'Edu Pages', category: 'edu', images: eduImgs, cover: eduImgs[0] };
    }

    // "Mission Archive" as a final catch-all
    albums['Mission Archive'] = { title: 'Mission Archive', category: 'general', images: allMedia, cover: allMedia[0] };

    // Set covers for projects that didn't get one
    Object.keys(albums).forEach(key => {
      if (!albums[key].cover && albums[key].images.length > 0) {
        albums[key].cover = albums[key].images[0];
      }
    });

    return albums;
  }, [allMedia]);

  const tabMedia = useMemo(() => {
    // Determine which images to show in the main gallery based on tab
    const keywords = activeTab === 'coral' ? ['focus', 'adopt', 'coral'] 
                  : activeTab === 'sweep' ? ['puls', 'clean', 'sweep', 'debris', 'harbor'] 
                  : ['aware', 'edu', 'workshop', 'flyer', 'docs', 'page'];
    
    return allMedia.filter(m => {
      const path = m.toLowerCase();
      return keywords.some(k => path.includes(k));
    });
  }, [activeTab, allMedia]);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(tabMedia.length / ITEMS_PER_PAGE);
  const currentGalleryItems = tabMedia.slice(galleryPage * ITEMS_PER_PAGE, (galleryPage + 1) * ITEMS_PER_PAGE);

  const openLightbox = (img) => {
    // Find best album match
    const album = Object.values(projectAlbums).find(a => a.images.includes(img) && a.title !== 'Mission Archive') || projectAlbums['Mission Archive'];
    const imgIndex = album.images.indexOf(img);
    setLightboxData({ 
      images: album.images, 
      index: imgIndex >= 0 ? imgIndex : 0, 
      title: album.title 
    });
  };

  const FeaturedMediaSlider = () => {
    const [mediaIdx, setMediaIdx] = useState(0);
    const filteredProjects = PROJECTS_LIST.filter(p => p.category === activeTab).slice(0, 3);
    
    const projectVideos = useMemo(() => {
      const vids = [];
      filteredProjects.forEach(p => {
        const folderVids = MANIFEST.archives.filter(m => 
          m.toLowerCase().endsWith('.mp4') && m.includes(p.folderPath)
        ).map(m => ({ type: 'local', path: m, project: p.title }));
        vids.push(...folderVids);
      });
      
      if (vids.length === 0) {
        const driveVids = (MANIFEST.videos || []).map(v => ({ type: 'drive', path: v.path, project: 'Mission Archive' }));
        vids.push(...driveVids);
      }
      
      const categoryImages = tabMedia.slice(0, 5).map(m => ({ type: 'image', path: m }));
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
              <button onClick={prevMedia} className="btn btn-outline" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(2,11,24,0.95)', fontSize: '1.5rem', border: '2px solid var(--teal)' }}>{'<'}</button>
              <button onClick={nextMedia} className="btn btn-outline" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(2,11,24,0.95)', fontSize: '1.5rem', border: '2px solid var(--teal)' }}>{'>'}</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="projects-page">
      {/* 1. CINEMATIC HERO */}
      <section className="projects-hero section" style={{ position: 'relative', overflow: 'hidden', padding: '180px 0 120px', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {heroImages.map((img, idx) => (
          <div key={idx} style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: idx === currentSlide ? 0.6 : 0,
            transition: 'opacity 2s ease-in-out',
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
            Live archives from our Hinnavaru conservation sites. Sorted by mission and project focus.
          </p>
        </div>
      </section>

      {/* 2. EXPLORATION INTERFACE */}
      <section className="section-sm" style={{ background: 'var(--ocean-deep)', paddingTop: '40px', paddingBottom: '0' }}>
        <div className="container">
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
              {PROJECTS_LIST.filter(p => p.category === activeTab).slice(0, 3).map((p, i) => {
                const projectFiles = MANIFEST.archives.filter(path => path.includes(p.folderPath));
                const mediaSrc = projectFiles.length > 0 ? projectFiles[0] : (tabMedia[i % tabMedia.length] || heroImages[0]);
                const isVideo = mediaSrc.toLowerCase().endsWith('.mp4');

                return (
                  <div key={i} className="card animate-reveal" style={{ background: 'rgba(255,255,255,0.02)', padding: '0', cursor: 'pointer', overflow: 'hidden' }} onClick={() => setSelectedProject(p)}>
                    {isVideo ? (
                      <video src={mediaSrc} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} autoPlay loop muted playsInline />
                    ) : (
                      <img src={mediaSrc} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} alt={p.title} />
                    )}
                    <div style={{ padding: '30px' }}>
                      <div className="badge badge-teal" style={{ marginBottom: '15px', fontWeight: 800 }}>{projectFiles.length} TOTAL RESOURCES</div>
                      <h4 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'white' }}>{p.title}</h4>
                      <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.6' }}>{p.desc.substring(0, 100)}...</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MISSION ARCHIVE (Gallery) */}
      <section className="section" id="archive" style={{ background: 'var(--ocean-deep)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge badge-teal" style={{ marginBottom: '16px' }}>📸 Mission Archive</div>
            <h2 className="section-title">Visual <span className="gradient-text">Bulletins</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Sorted by projects and community submissions.</p>
          </div>

          <div className="mockup-tab-nav" style={{ marginBottom: '40px' }}>
            <button className={`mockup-tab-btn ${archiveTab === 'image' ? 'active' : ''}`} onClick={() => setArchiveTab('image')}>📷 Images</button>
            <button className={`mockup-tab-btn ${archiveTab === 'video' ? 'active' : ''}`} onClick={() => setArchiveTab('video')}>🎥 Videos</button>
          </div>

          {archiveTab === 'image' && (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gridTemplateRows: 'repeat(2, 240px)',
                gap: '20px',
                minHeight: '500px'
              }}>
                {currentGalleryItems.map((img, i) => (
                  <div key={i} className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', cursor: 'zoom-in' }} onClick={() => openLightbox(img)}>
                    <img src={img} alt={`Update ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', fontSize: '0.7rem', opacity: 0.8 }}>
                      FILE: {img.split('/').pop().split('.')[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                <button className="btn btn-outline" disabled={galleryPage === 0} onClick={() => setGalleryPage(prev => prev - 1)}>← PREVIOUS</button>
                <div style={{ alignSelf: 'center', fontWeight: 800, color: 'var(--teal)' }}>PAGE {galleryPage + 1} / {totalPages}</div>
                <button className="btn btn-outline" disabled={galleryPage >= totalPages - 1} onClick={() => setGalleryPage(prev => prev + 1)}>NEXT →</button>
              </div>
            </>
          )}

          {archiveTab === 'video' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {(MANIFEST.videos || []).slice(0, 6).map((vid, i) => (
                <div key={i} className="card" style={{ padding: '0', overflow: 'hidden', background: '#000' }}>
                  <iframe src={vid.path} style={{ width: '100%', aspectRatio: '16/9', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxData && (
        <div className="modal-overlay" onClick={() => setLightboxData(null)}>
          <div className="modal glass-card" style={{ maxWidth: '1100px', width: '95%', padding: '0', height: '90vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '20px 30px', flex: '0 0 auto' }}>
              <div>
                <div className="badge badge-teal" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>ALBUM VIEW</div>
                <h3 className="gradient-text" style={{ margin: 0 }}>{lightboxData.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setLightboxData(null)}>×</button>
            </div>
            
            <div className="lightbox-viewport" style={{ position: 'relative', flex: '1 1 auto', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
               <img 
                 key={lightboxData.index}
                 src={lightboxData.images[lightboxData.index]} 
                 style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', animation: 'fadeIn 0.5s ease' }} 
                 alt="Enlarged view"
               />
               
               {lightboxData.images.length > 1 && (
                 <>
                   <button 
                     onClick={() => setLightboxData(prev => ({ ...prev, index: (prev.index > 0 ? prev.index - 1 : prev.images.length - 1) }))}
                     style={{ position: 'absolute', left: '20px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--teal)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
                   >←</button>
                   <button 
                     onClick={() => setLightboxData(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }))}
                     style={{ position: 'absolute', right: '20px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--teal)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }}
                   >→</button>
                 </>
               )}
            </div>

            <div className="lightbox-footer" style={{ padding: '25px', background: 'rgba(2,11,24,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)', flex: '0 0 auto' }}>
               <div style={{ fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 900, marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Project Albums:</div>
               <div className="album-picker" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                  {Object.values(projectAlbums).filter(a => a.images.length > 0).map((album, idx) => (
                    <div 
                      key={idx} 
                      className={`mini-album-thumb ${lightboxData.title === album.title ? 'active' : ''}`}
                      onClick={() => setLightboxData({ images: album.images, index: 0, title: album.title })}
                      style={{ 
                        flex: '0 0 140px', height: '85px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative',
                        border: lightboxData.title === album.title ? '2px solid var(--teal)' : '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <img src={album.cover} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: lightboxData.title === album.title ? 1 : 0.5 }} alt={album.title} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 800, textAlign: 'center', color: 'white' }}>{album.title.toUpperCase()}</div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal glass-card deep-dive-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className={`badge ${selectedProject.badgeClass}`} style={{ marginBottom: '8px' }}>{selectedProject.emoji} {selectedProject.badge}</div>
                <h3 className="gradient-text">{selectedProject.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="modal-content">
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px' }}>{selectedProject.desc}</p>
              <button className="btn btn-teal w-100" style={{ padding: '18px' }} onClick={() => {
                const album = projectAlbums[selectedProject.title];
                if (album) {
                  setLightboxData({ images: album.images, index: 0, title: album.title });
                  setSelectedProject(null);
                }
              }}>🖼️ OPEN PROJECT ALBUM</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .mockup-tab-nav { display: flex; gap: 12px; border-bottom: 2px solid rgba(255,255,255,0.05); justify-content: center; }
        .mockup-tab-btn { background: transparent; border: none; color: var(--text-muted); padding: 20px 30px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease; position: relative; }
        .mockup-tab-btn.active { color: var(--teal); }
        .mockup-tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: var(--teal); box-shadow: 0 0 15px var(--teal); }
        .featured-mission-container { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; padding: 60px; backdrop-filter: blur(20px); }
        .featured-media-frame { position: relative; padding: 15px; background: rgba(0,0,0,0.3); border: 1px solid rgba(13,211,197,0.3); border-radius: 30px; }
        .featured-media-inner { position: relative; aspect-ratio: 21/9; border-radius: 20px; overflow: hidden; }
        .featured-media-inner img { width: 100%; height: 100%; object-fit: cover; }
        .pulse-tag { position: absolute; top: 25px; right: 25px; background: rgba(0,0,0,0.6); padding: 10px 20px; border-radius: 100px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--teal); font-size: 0.75rem; font-weight: 900; }
        .mini-album-thumb:hover { transform: scale(1.05); border-color: var(--teal); }
        .album-picker::-webkit-scrollbar { height: 4px; }
        .album-picker::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 2px; }
      `}</style>
    </div>
  )
}
