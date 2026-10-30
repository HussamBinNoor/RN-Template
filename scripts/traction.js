#!/usr/bin/env node
'use strict';

/**
 * Traction snapshot — every public number we track, in one command.
 *
 *   node scripts/traction.js
 *
 * Sections, each degrading gracefully when its source is unavailable:
 *
 *   1. GitHub repo   — public API, no auth. Stars, forks, watchers, issues.
 *   2. GitHub traffic — needs push access to the repo (GH_TOKEN / gh auth).
 *                      Unique views, total views, clones, top referrers/paths.
 *   3. npm registry  — public API, no auth. Latest version, publish date.
 *   4. npm downloads — public API, no auth. Weekly / monthly / yearly totals.
 *
 * Every API here is public or owner-scoped. Nothing in this script reads or
 * transmits project source code.
 */

const { execFileSync } = require('child_process');

const REPO = 'HussamBinNoor/RN-Template';
const PACKAGES = ['hbn-rn-template', 'create-rn87-app'];

const UA = 'hbn-rn-template-traction';

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

function head(title) {
  console.log(`\n${c.bold(c.cyan(`── ${title} ${'─'.repeat(Math.max(0, 58 - title.length))}`))}`);
}

function row(label, value) {
  console.log(`  ${label.padEnd(26)} ${value}`);
}

function note(msg) {
  console.log(`  ${c.dim(msg)}`);
}

/** GET JSON with an optional token. Returns null on any failure. */
async function getJSON(url, token) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return { error: res.status };
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Resolve a GitHub token: env first, then the gh CLI's keyring.
 * Returns null when neither is available or usable.
 */
function resolveToken() {
  const env = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (env) return env;
  try {
    const out = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const token = out.trim();
    return token.length > 0 ? token : null;
  } catch {
    return null;
  }
}

async function githubRepo() {
  head('GitHub repo');
  const data = await getJSON(`https://api.github.com/repos/${REPO}`);
  if (data.error) {
    note(`${c.yellow('unavailable')} — ${REPO} (${data.error})`);
    return;
  }
  row('stars', c.bold(String(data.stargazers_count)));
  row('forks', String(data.forks_count));
  row('watchers', String(data.subscribers_count ?? data.watchers_count));
  row('open issues', String(data.open_issues_count));
  row('created', new Date(data.created_at).toISOString().slice(0, 10));
  row('last push', new Date(data.pushed_at).toISOString().slice(0, 10));
  row('age', `${Math.floor((Date.now() - new Date(data.created_at).getTime()) / 86400000)} days`);
  row('license', data.license?.spdx_id ?? 'none');
  row('topics', data.topics?.length ? data.topics.join(', ') : c.dim('none set'));
  console.log(`  ${c.dim('→')} ${data.html_url}`);
}

async function githubTraffic(token) {
  head('GitHub traffic (last 14 days)');
  if (!token) {
    note(`${c.yellow('skipped')} — no GitHub token found.`);
    note('Set GH_TOKEN, or run: gh auth login && gh auth switch');
    return;
  }

  const views = await getJSON(`https://api.github.com/repos/${REPO}/traffic/views`, token);
  if (views.error) {
    note(`${c.yellow('unavailable')} — traffic API returned ${views.error}.`);
    note('Needs a token with push access to ' + REPO);
    return;
  }

  row('unique visitors', c.bold(String(views.count)));
  row('total page views', String(views.views?.total ?? 0));
  row('per-day avg', String(views.views?.average ?? 0));
  row('clones (14d)', String(views.clones?.total ?? 0));

  const referrers = await getJSON(`https://api.github.com/repos/${REPO}/traffic/popular/referrers`, token);
  if (!referrers.error && Array.isArray(referrers) && referrers.length) {
    console.log(`  ${c.dim('top referrers:')}`);
    referrers.slice(0, 5).forEach((r) => row(`  ${r.referrer || '(direct)'}`, String(r.count)));
  }

  const paths = await getJSON(`https://api.github.com/repos/${REPO}/traffic/popular/paths`, token);
  if (!paths.error && Array.isArray(paths) && paths.length) {
    console.log(`  ${c.dim('top paths:')}`);
    paths.slice(0, 5).forEach((p) => row(`  ${p.path}`, String(p.count)));
  }
}

async function npmRegistry() {
  head('npm registry');
  let any = false;
  for (const pkg of PACKAGES) {
    const data = await getJSON(`https://registry.npmjs.org/${pkg}`);
    if (data.error) {
      note(`${pkg} — ${c.yellow('not published')} (${data.error})`);
      continue;
    }
    any = true;
    const latest = data['dist-tags']?.latest;
    const published = data.time?.[latest];
    console.log(`  ${c.bold(pkg)}`);
    row('  latest version', String(latest));
    row('  published', published ? new Date(published).toISOString().slice(0, 10) : 'unknown');
    row('  unpacked size', formatBytes(data.versions?.[latest]?.dist?.unpackedSize));
    row('  total versions', String(Object.keys(data.versions ?? {}).length));
    row('  dependents', String(data.dependents ?? 0));
  }
  if (!any) note(c.dim('Nothing published yet — npm download counts start at first publish.'));
}

async function npmDownloads() {
  head('npm downloads');
  let any = false;
  for (const pkg of PACKAGES) {
    const week = await getJSON(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
    if (week.error) {
      note(`${pkg} — ${c.yellow('no data')} (${week.error})`);
      continue;
    }
    any = true;
    const month = await getJSON(`https://api.npmjs.org/downloads/point/last-month/${pkg}`);
    const year = await getJSON(`https://api.npmjs.org/downloads/point/last-year/${pkg}`);
    console.log(`  ${c.bold(pkg)}`);
    row('  this week', c.bold(String(week.downloads ?? 0)));
    row('  this month', String(month?.downloads ?? 0));
    row('  last 12 months', String(year?.downloads ?? 0));
  }
  if (!any) note(c.dim('No download data yet — publish the packages first.'));
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return 'unknown';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  console.log(c.bold('\n🚀 Traction snapshot') + c.dim(`  ${REPO}  ·  ${new Date().toISOString().slice(0, 10)}\n`));

  const token = resolveToken();
  await githubRepo();
  await githubTraffic(token);
  await npmRegistry();
  await npmDownloads();

  console.log('');
  console.log(c.dim('  Re-run anytime:  yarn traction'));
  console.log('');
}

main().catch((err) => {
  console.error(c.red(`\nFailed: ${err.message}`));
  process.exit(1);
});
