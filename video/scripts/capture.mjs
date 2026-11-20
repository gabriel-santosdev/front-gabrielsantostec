// Captura telas reais do portfólio (rodando em http://localhost:3000) para usar no vídeo.
// Uso: com `npm run dev` ativo na raiz do site, rode `npm run capture` dentro de video/.
import puppeteer from 'puppeteer-core'
import { existsSync } from 'node:fs'

const URL = process.env.SITE_URL ?? 'http://localhost:3000/'
const OUT = 'public/shots'
const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
]
const executablePath = process.env.CHROME_PATH ?? browsers.find(existsSync)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--hide-scrollbars'] })

async function open(viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 180000 })
  await page.evaluate(() => document.fonts.ready)
  // esconde o bot�o flutuante do Nuxt DevTools
  await page.addStyleTag({ content: '#nuxt-devtools-container,nuxt-devtools-frame{display:none!important}' })
  await sleep(1500)
  return page
}

// Desktop 1920x1080
const page = await open({ width: 1920, height: 1080, deviceScaleFactor: 1 })
await page.screenshot({ path: `${OUT}/hero.png` })

// Terminal: digita comandos de verdade
await page.click('#term-input')
for (const cmd of ['whoami', 'experience']) {
  await page.type('#term-input', cmd, { delay: 40 })
  await page.keyboard.press('Enter')
  await sleep(900)
}
const term = await page.$('.term')
await term.screenshot({ path: `${OUT}/terminal.png` })

// Seções (sem o header fixo por cima)
await page.addStyleTag({ content: '.nav{display:none!important}' })
for (const id of ['cv', 'stack', 'projects', 'services', 'contact']) {
  const el = await page.$(`#${id}`)
  await el.scrollIntoView()
  await sleep(600)
  await el.screenshot({ path: `${OUT}/${id}.png` })
}
await page.close()

// Mobile
const mobile = await open({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
await mobile.screenshot({ path: `${OUT}/mobile-hero.png` })
const proj = await mobile.$('#projects')
await proj.scrollIntoView()
await sleep(600)
await mobile.screenshot({ path: `${OUT}/mobile-projects.png` })

await browser.close()
console.log('ok')
