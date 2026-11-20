import { loadFont as loadSpaceGrotesk } from '@remotion/google-fonts/SpaceGrotesk'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono'

// Paleta original do portfólio (assets/css/main.css)
export const C = {
  bg: '#121212',
  bg2: '#191919',
  surface: '#202020',
  text: '#f2f2f2',
  muted: '#a3a3a3',
  primary: '#6f00ff',
  secondary: '#31007f',
  accent: '#bb99ff',
  success: '#4ade80',
}

export const display = loadSpaceGrotesk('normal', { weights: ['500', '700'], subsets: ['latin'] }).fontFamily
export const text = loadInter('normal', { weights: ['400', '500', '600'], subsets: ['latin'] }).fontFamily
export const mono = loadJetBrains('normal', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily

// Música a 120 BPM: 1 tempo = 15 frames, 1 compasso = 60 frames (scripts/music.py)
export const FPS = 30
export const BEAT = 15
export const BAR = 60
export const TOTAL = 38 * FPS

// Cortes, todos no compasso
export const T = {
  intro: 0,
  drop: 120,
  kinetic: 180,
  hero: 300,
  terminal: 420,
  cv: 540,
  stack: 660,
  projects: 720,
  responsive: 840,
  outro: 960,
  finalHit: 1020,
}
