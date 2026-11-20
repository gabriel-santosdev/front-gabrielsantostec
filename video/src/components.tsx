import type { CSSProperties, FC, ReactNode } from 'react'
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import logo from './logoPieces.json'
import { BEAT, C, display, mono, T } from './theme'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

/* ------------------------------------------------------------ fundo */
export const Background: FC = () => {
  const f = useCurrentFrame()
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(242,242,242,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          backgroundPosition: `0 ${f * 0.8}px`,
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 650px at ${55 + 22 * Math.sin(f / 80)}% ${42 + 12 * Math.cos(f / 65)}%, rgba(111,0,255,.30), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(700px 500px at ${25 + 10 * Math.cos(f / 90)}% 85%, rgba(49,0,127,.35), transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  )
}

/* Brilho que pulsa a cada bumbo (depois do drop) */
export const BeatPulse: FC = () => {
  const f = useCurrentFrame()
  if (f < T.drop || f >= T.finalHit) return null
  const o = 0.16 * Math.exp(-(f % BEAT) / 3.5)
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        background: 'radial-gradient(1200px 500px at 50% 110%, rgba(111,0,255,1), transparent 70%)',
        opacity: o,
      }}
    />
  )
}

/* ------------------------------------------------------------ transição: a barra "/" do logo */
export const SlashWipe: FC<{ at: number; reverse?: boolean; tone?: 'primary' | 'accent' }> = ({ at, reverse, tone = 'primary' }) => {
  const f = useCurrentFrame()
  if (f < at - 10 || f > at + 10) return null
  let x = interpolate(f, [at - 10, at + 10], [-3000, 2320], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  if (reverse) x = 1920 - x - 2600
  const bg =
    tone === 'primary'
      ? `linear-gradient(90deg, ${C.secondary}, ${C.primary} 40%, ${C.primary} 60%, ${C.secondary})`
      : `linear-gradient(90deg, ${C.primary}, ${C.accent} 50%, ${C.primary})`
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: x,
          width: 2600,
          height: 1200,
          background: bg,
          transform: 'skewX(-20deg)',
          boxShadow: `0 0 120px 40px rgba(111,0,255,.6)`,
        }}
      />
    </AbsoluteFill>
  )
}

/* Clarão de impacto */
export const Flash: FC<{ at: number; strength?: number }> = ({ at, strength = 0.85 }) => {
  const f = useCurrentFrame()
  if (f < at || f > at + 18) return null
  const o = interpolate(f, [at, at + 18], [strength, 0], { ...clamp, easing: Easing.out(Easing.quad) })
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        background: `radial-gradient(circle at 50% 50%, #ffffff, ${C.accent} 30%, ${C.primary} 70%)`,
        opacity: o,
        mixBlendMode: 'screen',
      }}
    />
  )
}

/* ------------------------------------------------------------ logo animado */
type Piece = { name: string; x: number; y: number; w: number; h: number }
const pieces = logo.pieces as Piece[]

/** timing: frame (local) em que cada peça entra. Peças: w0..w4 = g a b r e; p0_0/p0_1 = ":"; p1_0 = "/" */
export const Logo: FC<{ width: number; timing: Record<string, number>; glowFrom?: number }> = ({ width, timing, glowFrom }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = width / logo.width
  const glow = glowFrom !== undefined ? interpolate(f, [glowFrom, glowFrom + 10], [0, 1], clamp) : 0

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: logo.height * s,
        filter: glow ? `drop-shadow(0 0 ${30 * glow}px rgba(111,0,255,${0.7 * glow}))` : undefined,
      }}
    >
      {pieces.map((p) => {
        const start = timing[p.name] ?? 0
        const local = f - start
        if (local < 0) return null
        let transform = ''
        let opacity = 1
        let blur = 0

        if (p.name.startsWith('w')) {
          const k = spring({ frame: local, fps, config: { damping: 13, stiffness: 190, mass: 0.6 } })
          transform = `translateY(${(1 - k) * 140}px) scaleY(${0.6 + 0.4 * k})`
          opacity = interpolate(local, [0, 4], [0, 1], clamp)
          blur = (1 - Math.min(k, 1)) * 14
        } else if (p.name.startsWith('p0')) {
          const k = spring({ frame: local, fps, config: { damping: 9, stiffness: 260, mass: 0.5 } })
          transform = `scale(${k}) rotate(${(1 - k) * 180}deg)`
        } else {
          // a barra entra rasgando na diagonal
          const k = interpolate(local, [0, 5], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) })
          transform = `translate(${(1 - k) * 900}px, ${(1 - k) * -1800}px)`
          opacity = interpolate(local, [0, 2], [0, 1], clamp)
        }

        return (
          <Img
            key={p.name}
            src={staticFile(`logo/${p.name}.png`)}
            style={{
              position: 'absolute',
              left: p.x * s,
              top: p.y * s,
              width: p.w * s,
              height: p.h * s,
              transform,
              transformOrigin: 'center bottom',
              opacity,
              filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
            }}
          />
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------ texto */
export const Typed: FC<{ text: string; start: number; cps?: number; cursor?: boolean; style?: CSSProperties }> = ({
  text,
  start,
  cps = 1.6,
  cursor = true,
  style,
}) => {
  const f = useCurrentFrame()
  const n = Math.max(0, Math.floor((f - start) * cps))
  const done = n >= text.length
  const blink = Math.floor(f / 8) % 2 === 0
  return (
    <span style={{ fontFamily: mono, whiteSpace: 'pre', ...style }}>
      {text.slice(0, n)}
      {cursor && (!done || blink) ? (
        <span style={{ display: 'inline-block', width: '0.55em', height: '1.1em', background: C.accent, verticalAlign: 'text-bottom', marginLeft: 2 }} />
      ) : null}
    </span>
  )
}

export const SceneTitle: FC<{ kicker: string; title: ReactNode; x?: number; y?: number; size?: number; delay?: number }> = ({
  kicker,
  title,
  x = 260,
  y = 56,
  size = 54,
  delay = 0,
}) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const k = spring({ frame: f - delay - 4, fps, config: { damping: 16, stiffness: 140 } })
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ fontFamily: mono, fontSize: 20, color: C.muted, marginBottom: 10 }}>
        <span style={{ color: '#737373' }}>// </span>
        <Typed text={kicker} start={delay} cps={2.2} cursor={false} style={{ color: C.accent }} />
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: size,
          letterSpacing: '-0.03em',
          color: C.text,
          lineHeight: 1.05,
          opacity: k,
          transform: `translateY(${(1 - k) * 40}px)`,
        }}
      >
        {title}
      </div>
    </div>
  )
}

export const Accent: FC<{ children: ReactNode }> = ({ children }) => (
  <span
    style={{
      background: `linear-gradient(90deg, ${C.text} 0%, ${C.accent} 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    }}
  >
    {children}
  </span>
)

/* ------------------------------------------------------------ moldura de navegador */
export const Browser: FC<{
  width: number
  viewportH: number
  src: string
  scroll?: number
  url?: string
  style?: CSSProperties
  innerStyle?: CSSProperties
}> = ({ width, viewportH, src, scroll = 0, url = 'gabriel santos · portfólio', style, innerStyle }) => (
  <div
    style={{
      width,
      borderRadius: 18,
      overflow: 'hidden',
      background: C.surface,
      border: '1px solid rgba(242,242,242,.14)',
      boxShadow: '0 50px 140px rgba(0,0,0,.65), 0 0 90px rgba(111,0,255,.28)',
      ...style,
    }}
  >
    <div
      style={{
        height: 46,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '0 20px',
        background: '#1a1a1a',
        borderBottom: '1px solid rgba(242,242,242,.08)',
      }}
    >
      {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
        <span key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />
      ))}
      <div
        style={{
          flex: 1,
          margin: '0 120px',
          height: 28,
          borderRadius: 8,
          background: '#232323',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: mono,
          fontSize: 14,
          color: C.muted,
        }}
      >
        <span style={{ color: C.success, marginRight: 8 }}>●</span>
        {url}
      </div>
    </div>
    <div style={{ height: viewportH, overflow: 'hidden', position: 'relative' }}>
      <Img src={staticFile(src)} style={{ width: '100%', display: 'block', transform: `translateY(${-scroll}px)`, ...innerStyle }} />
    </div>
  </div>
)

/* ------------------------------------------------------------ moldura de celular */
export const Phone: FC<{ src: string; width: number; style?: CSSProperties }> = ({ src, width, style }) => {
  const h = width * (2532 / 1170)
  return (
    <div
      style={{
        width: width + 24,
        height: h + 24,
        padding: 12,
        borderRadius: 54,
        background: 'linear-gradient(145deg, #2c2c2c, #0d0d0d)',
        border: '1px solid rgba(242,242,242,.18)',
        boxShadow: '0 50px 120px rgba(0,0,0,.7), 0 0 80px rgba(111,0,255,.3)',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ width, height: h, borderRadius: 42, overflow: 'hidden', position: 'relative' }}>
        <Img src={staticFile(src)} style={{ width: '100%', display: 'block' }} />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: '50%',
            width: 110,
            height: 30,
            marginLeft: -55,
            borderRadius: 99,
            background: '#000',
          }}
        />
      </div>
    </div>
  )
}

export { clamp }
