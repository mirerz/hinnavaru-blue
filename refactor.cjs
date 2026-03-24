const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// NAVBAR
css = css.replace(
`.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 0 32px;`,
`.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 0 20px;`
);

css = css.replace(
`.nav-links {
  display: flex; align-items: center; gap: 4px;
  list-style: none;
}`,
`.nav-links {
  display: none; position: absolute; top: 72px; left: 0; right: 0; flex-direction: column;
  background: var(--ocean-mid); border-bottom: 1px solid var(--card-border);
  padding: 12px 20px 20px; gap: 2px; list-style: none;
}
.nav-links.open { display: flex; }`
);

css = css.replace('.nav-cta { margin-left: 12px; }', '.nav-cta { display: none; }');

css = css.replace(
`.nav-toggle {
  display: none;`,
`.nav-toggle {
  display: block;`
);

// FOOTER
css = css.replace(
`.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px; margin-bottom: 48px;
}`,
`.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px; margin-bottom: 48px;
}`
);

css = css.replace(
`.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center;
  color: var(--text-muted); font-size: 0.85rem;
}`,
`.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex; flex-direction: column; gap: 12px; text-align: center;
  color: var(--text-muted); font-size: 0.85rem;
}`
);

// HERO
css = css.replace(
`.hero h1 {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 900; line-height: 1.05;
  margin-bottom: 24px;
}`,
`.hero h1 {
  font-size: 2.4rem;
  font-weight: 900; line-height: 1.05;
  margin-bottom: 24px;
}`
);

css = css.replace(
`.hero-stats {
  display: flex; gap: 48px; margin-top: 64px;
  flex-wrap: wrap;
}`,
`.hero-stats {
  display: flex; gap: 28px; margin-top: 64px;
  flex-wrap: wrap;
}`
);

// GRIDS
css = css.replace('.feat-strip-grid {\n  display: grid; grid-template-columns: repeat(4,1fr); gap: 24px;\n}', '.feat-strip-grid {\n  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;\n}');
css = css.replace('.impact-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }', '.impact-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }');
css = css.replace(
`.mission-strip {
  background: linear-gradient(135deg, var(--ocean-surface), var(--ocean-mid));
  border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: 56px; display: flex; gap: 64px; align-items: center;
}`,
`.mission-strip {
  background: linear-gradient(135deg, var(--ocean-surface), var(--ocean-mid));
  border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: 36px; display: flex; flex-direction: column; gap: 32px;
}`
);
css = css.replace('.news-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }', '.news-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }');
css = css.replace('.about-pillars { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; margin-top: 48px; }', '.about-pillars { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; }');
css = css.replace('.team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }', '.team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }');
css = css.replace('.projects-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 28px; }', '.projects-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }');
css = css.replace('.archive-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 32px; }', '.archive-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 32px; }');
css = css.replace('.transparency-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; margin-top: 32px; }', '.transparency-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 32px; }');
css = css.replace('.sponsor-tiers { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 48px; }', '.sponsor-tiers { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; }');
css = css.replace('.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }', '.form-row { display: grid; grid-template-columns: 1fr; gap: 16px; }');
css = css.replace(
`.lagoon-map-wrapper {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-lg); overflow: hidden;
  height: 520px; position: relative;
}`,
`.lagoon-map-wrapper {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-lg); overflow: hidden;
  height: 380px; position: relative;
}`
);
css = css.replace('.nursery-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 48px; }', '.nursery-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }');

// REPLACE THE MEDIA RESPONSIVE BLOCK
const targetString = "/* ===== RESPONSIVE ===== */";
const startIndex = css.indexOf(targetString);
if (startIndex !== -1) {
  css = css.substring(0, startIndex);
}

const minMediaBlock = `/* ===== RESPONSIVE (MOBILE-FIRST) ===== */
@media (min-width: 768px) {
  .navbar { padding: 0 32px; }
  .nav-links { display: flex; position: static; flex-direction: row; background: none; border-bottom: none; padding: 0; gap: 4px; }
  .nav-cta { display: inline-flex; margin-left: 12px; }
  .nav-toggle { display: none; }
  .hero h1 { font-size: clamp(2.8rem, 6vw, 5rem); }
  .hero-stats { gap: 48px; }
  .mission-strip { flex-direction: row; padding: 56px; gap: 64px; align-items: center; }
  .projects-grid { grid-template-columns: repeat(2,1fr); }
  .news-grid { grid-template-columns: repeat(3,1fr); }
  .about-pillars { grid-template-columns: repeat(2,1fr); }
  .sponsor-tiers { grid-template-columns: repeat(2,1fr); }
  .team-grid { grid-template-columns: repeat(2,1fr); }
  .impact-grid { grid-template-columns: repeat(2,1fr); }
  .feat-strip-grid { grid-template-columns: repeat(2,1fr); }
  .nursery-stats { grid-template-columns: repeat(2,1fr); }
  .transparency-grid { grid-template-columns: repeat(2,1fr); }
  .archive-grid { grid-template-columns: repeat(3,1fr); }
  .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
  .form-row { grid-template-columns: repeat(2,1fr); }
  .lagoon-map-wrapper { height: 520px; }
}

@media (min-width: 1024px) {
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
  .team-grid { grid-template-columns: repeat(4,1fr); }
  .impact-grid { grid-template-columns: repeat(3,1fr); }
  .sponsor-tiers { grid-template-columns: repeat(3,1fr); }
  .feat-strip-grid { grid-template-columns: repeat(4,1fr); }
  .nursery-stats { grid-template-columns: repeat(4,1fr); }
}

.nav-logo-img { height: 48px; width: auto; max-width: 140px; display: block; filter: drop-shadow(0 0 8px rgba(14,165,233,0.3)); }
`;

css += minMediaBlock;

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Mobile-first refactor applied successfully.');
