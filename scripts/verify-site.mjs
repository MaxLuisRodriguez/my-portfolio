import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Structural rendering and built-file checks; no browser or screenshots involved.
const github = process.argv.includes('--github')
const base = github ? '/my-portfolio/' : '/'
const origin = 'https://portfolio.test'
const server = await createServer({ mode: github ? 'github' : 'production', server: { middlewareMode: true }, appType: 'custom' })
globalThis.window = { matchMedia: () => ({ matches: true }) }
let checked = 0

function verifyLinks(markup, pagePath, ids) {
  for (const match of markup.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&')
    if (/^(https?:|mailto:|data:|tel:)/.test(href)) continue
    const target = new URL(href, origin + pagePath)
    assert(target.pathname.startsWith(base), `Link escapes deployment base: ${href}`)
    if (target.hash && target.pathname === pagePath && ids) {
      assert(ids.has(decodeURIComponent(target.hash.slice(1))), `Missing anchor: ${href}`)
    }
    let path = decodeURIComponent(target.pathname.slice(base.length))
    if (!path || path.endsWith('/')) path += 'index.html'
    assert(existsSync(resolve('dist', path)), `Missing built target: ${pagePath} -> ${href}`)
    checked++
  }
}

try {
  for (const [module, path] of [['/src/App.tsx', base], ['/src/Evensong.tsx', `${base}evensong/`]]) {
    const { default: Component } = await server.ssrLoadModule(module)
    const markup = renderToStaticMarkup(createElement(Component))
    assert(!/[—]|résumé/i.test(markup), `${path}: use direct punctuation and unaccented Resume`)
    const allIds = [...markup.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
    const ids = new Set(allIds)
    assert.equal(allIds.length, ids.size, `${path}: duplicate IDs`)
    assert.equal([...markup.matchAll(/<h1\b/g)].length, 1, `${path}: one primary heading`)
    assert(markup.includes('Skip to content'), `${path}: skip link`)
    for (const img of markup.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]+"/.test(img[0]), 'Missing descriptive image alt')
    verifyLinks(markup, path, ids)
    if (path === base) {
      assert(markup.includes('https://purl.stanford.edu/vk447bc1950'))
      assert(markup.includes('https://doi.org/10.25740/vk447bc1950'))
      assert(markup.includes('E3 Group') && markup.includes('AI Software Engineer Intern'))
    } else {
      assert.equal([...markup.matchAll(/<video\b/g)].length, 1)
      assert.equal([...markup.matchAll(/aria-pressed="false"/g)].length, 1, 'Reduced-motion mode starts paused')
      assert(!markup.includes(' autoplay'), 'Autoplay must be controlled by visibility and motion preference')
    }
  }
  for (const path of ['index.html', 'evensong/index.html', 'resume.html']) {
    const markup = readFileSync(resolve('dist', path), 'utf8')
    assert(/<title>[^<]+<\/title>/.test(markup), `Missing title: ${path}`)
    verifyLinks(markup, `${base}${path}`)
    for (const block of markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(block[1])
  }
  for (const file of ['evensong-environments.mp4']) {
    const bytes = readFileSync(resolve('dist/media', file))
    assert.equal(bytes.subarray(4, 8).toString(), 'ftyp', `MP4 signature: ${file}`)
    assert(bytes.length < 2_000_000, `Unexpected video payload: ${file}`)
  }
  const pdf = readFileSync('dist/Max-Rodriguez-Resume.pdf')
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-')
  console.log(`PASS: ${github ? 'GitHub Pages' : 'Vercel'} base; ${checked} local references, page structure, metadata, motion defaults, and media assets.`)
} finally {
  delete globalThis.window
  await server.close()
}
