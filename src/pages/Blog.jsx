import { Link } from 'react-router-dom'
import { CMS_CONFIG } from '../data/cms'

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Resilience of Lhaviyani Reefs',
    excerpt: 'Exploring how local communities are leading the way in coral restoration and lagoon protection.',
    author: 'Admin',
    date: 'April 12, 2026',
    category: 'Ecology',
    image: '/Living-L.png'
  },
  {
    id: 2,
    title: 'Nursery Updates: Q1 2026',
    excerpt: 'Detailed breakdown of our latest planting sessions in the Hinnavaru lagoon nurseries.',
    author: 'Founder',
    date: 'April 10, 2026',
    category: 'Missions',
    image: '/Project-Progs.png'
  },
  {
    id: 3,
    title: 'Community Voices: Why We Dive',
    excerpt: 'Interviews with our latest batch of Reef Guardians on their connection to the ocean.',
    author: 'Lead Diver',
    date: 'April 05, 2026',
    category: 'Community',
    image: '/media-hub/HBI_20260408_01.webp'
  }
]

export default function Blog() {
  return (
    <div className="blog-page">
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0 100px', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('/Living-L.png')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.2
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>📝 PROGRAM BLOG</div>
          <h1 className="section-title">Mission <span className="gradient-text">Log</span></h1>
          <p className="section-sub">Deep dives into the stories, data, and community spirit driving Hinnavaru Blue.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {BLOG_POSTS.map(post => (
              <div key={post.id} className="card blog-card animate-reveal" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="badge badge-teal" style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '0.65rem' }}>{post.category}</div>
                </div>
                <div style={{ padding: '30px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 800, marginBottom: '10px' }}>{post.date.toUpperCase()}</div>
                  <h3 style={{ marginBottom: '15px', fontSize: '1.4rem' }}>{post.title}</h3>
                  <p style={{ opacity: 0.7, fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>By {post.author}</span>
                    <button className="btn btn-outline btn-sm">Read Entry</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-8px);
          border-color: var(--teal);
        }
      `}</style>
    </div>
  )
}
