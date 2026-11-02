#!/usr/bin/env node
// Zero-dependency static checks for UNLOXX GitHub Pages.
// These checks do not replace browser, auth, accessibility, or database security tests.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Script } from 'node:vm';

const root = process.cwd();
const failures = [];
const read = file => readFileSync(join(root, file), 'utf8');
const check = (ok, message) => { if (!ok) failures.push(message); };
const htmlFiles = readdirSync(root).filter(name => name.endsWith('.html'));
const jsFiles = readdirSync(root).filter(name => name.endsWith('.js'));
check(htmlFiles.includes('index.html'), 'Missing GitHub Pages entrypoint index.html');

for (const file of jsFiles) {
  try { new Script(read(file), { filename: file }); }
  catch (error) { failures.push('Invalid JavaScript in ' + file + ': ' + error.message); }
}

for (const file of htmlFiles) {
  const html = read(file);
  const assetPattern = /(?:src|href)\s*=\s*["']\.\/([^"'?#]+)(?:\?[^"']*)?["']/g;
  for (const match of html.matchAll(assetPattern)) {
    const asset = match[1];
    check(!asset.includes('..') && existsSync(join(root, asset)), file + ': missing/unsafe local asset ' + asset);
  }
  const inlinePattern = /<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
  for (const [index, match] of [...html.matchAll(inlinePattern)].entries()) {
    if (!match[1].trim()) continue;
    try { new Script(match[1], { filename: file + '#inline-' + index }); }
    catch (error) { failures.push('Invalid inline script in ' + file + ': ' + error.message); }
  }
}

const index = existsSync(join(root, 'index.html')) ? read('index.html') : '';
const portfolioJs = existsSync(join(root, 'unloxx-student-portfolio.js'));
const portfolioCss = existsSync(join(root, 'unloxx-student-portfolio.css'));
check(portfolioJs === portfolioCss, 'Portfolio JavaScript and stylesheet must be added together');
if (portfolioJs) {
  // Legacy portfolio assets remain in the repository but are intentionally not loaded by the real-auth homepage.
  // Require paired references only when the legacy portfolio is intentionally activated.
  const portfolioActivated = index.includes('./unloxx-student-portfolio.js') || index.includes('./unloxx-student-portfolio.css');
  if (portfolioActivated) {
    check(index.includes('./unloxx-student-portfolio.js'), 'Portfolio JavaScript is not loaded by index.html');
    check(index.includes('./unloxx-student-portfolio.css'), 'Portfolio stylesheet is not loaded by index.html');
  }
  const rankList = file => read(file).match(/const ranks=(\[[^;]+\]);/)?.[1] ?? null;
  const achievements = rankList('unloxx-achievements.js');
  const portfolio = rankList('unloxx-student-portfolio.js');
  check(Boolean(achievements) && achievements === portfolio, 'Achievements and Portfolio rank ladders disagree');
  check((portfolio?.match(/,\d+\]/g) || []).length === 11, 'Expected exactly 11 rank thresholds');
}

for (const file of [...htmlFiles, ...jsFiles]) {
  const content = read(file);
  check(!/sb_secret_[A-Za-z0-9]+/.test(content), 'Potential Supabase secret key in public asset ' + file);
}
if (failures.length) {
  console.error('UNLOXX static checks FAILED:\n' + failures.map(x => ' - ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('UNLOXX static checks passed: ' + htmlFiles.length + ' HTML pages, ' + jsFiles.length + ' JavaScript files, asset references and portfolio wiring.');
}
