import type { FC, ReactNode } from 'react'
import { AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import {
  Accent,
  Background,
  BeatPulse,
  Browser,
  clamp,
  Flash,
  Logo,
  Phone,
  SceneTitle,
  SlashWipe,
  Typed,
} from './components'
import { BEAT, C, display, mono, T, text, TOTAL } from './theme'

/* Escala da captura 1920px dentro do navegador de 1400px */
const BW = 1400
const VIEW_H = 780
const SHOT = BW / 1920

/* Entrada 3D comum aos navegadores */
function useTilt(delay = 0) {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const k = spring({ frame: f - delay, fps, config: { damping: 18, stiffness: 90 } })
  return {
    k,
    transform: `perspective(2200px) translateY(${(1 - k) * 260}px) rotateX(${(1 - k) * 28}deg) rotateY(${(1 - k) * -10}deg) scale(${0.86 + 0.14 * k})`,
    opacity: Math.min(1, k * 1.5),
  }
}

/* ============================================================ 1. logo (0–6 s) */
const Intro: FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const drop = T.drop

  const shake = f >= drop && f < drop + 10 ? Math.sin(f * 3.1) * (10 - (f - drop)) * 2.2 : 0
  const punch = f >= drop ? 1 + 0.07 * Math.exp(-(f - drop) / 4) : 1
  const rise = spring({ frame: f - (drop + 12), fps, config: { damping: 15, stiffness: 120 } })
  const exit = interpolate(f, [165, 180], [1, 1.35], { ...clamp, easing: Easing.in(Easing.cubic) })
  const exitBlur = interpolate(f, [168, 180], [0, 14], clamp)
  const promptOut = interpolate(f, [24, 32], [1, 0], clamp)
  const pill = spring({ frame: f - 150, fps, config: { damping: 12, stiffness: 200 } })

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', transform: `translateX(${shake}px) scale(${exit})`, filter: exitBlur ? `blur(${exitBlur}px)` : undefined }}>
      <div style={{ position: 'absolute', fontSize: 34, color: C.muted, opacity: promptOut }}>
        <span style={{ fontFamily: mono, color: C.success }}>~ $ </span>
        <Typed text="./portfolio --v2" start={2} cps={1.2} style={{ color: C.text }} />
      </div>

      <div style={{ transform: `translateY(${-70 * rise}px) scale(${punch})` }}>
        <Logo
          width={1180}
          glowFrom={drop}
          timing={{ w0: 30, w1: 37, w2: 45, w3: 52, w4: 60, p0_0: 90, p0_1: 105, p1_0: drop - 5 }}
        />
      </div>

      <div style={{ position: 'absolute', top: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        <div style={{ fontSize: 40, color: C.text, opacity: f >= drop + 14 ? 1 : 0 }}>
          <span style={{ fontFamily: mono, color: C.accent }}>&gt; </span>
          <Typed text="Software Engineer Full Stack" start={drop + 16} cps={2} />
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 22,
            color: C.accent,
            padding: '10px 22px',
            borderRadius: 99,
            border: `1px solid rgba(187,153,255,.4)`,
            background: 'rgba(187,153,255,.1)',
            transform: `scale(${pill})`,
            opacity: pill,
          }}
        >
          ✦ portfólio · nova versão
        </div>
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 2. tipografia cinética (6–10 s) */
const Word: FC<{ at: number; children: ReactNode; size: number; color?: string; accent?: boolean }> = ({ at, children, size, color = C.text, accent }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const k = spring({ frame: f - at, fps, config: { damping: 11, stiffness: 220, mass: 0.6 } })
  if (f < at) return <span style={{ fontSize: size, opacity: 0 }}>{children}</span>
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: display,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color,
        transform: `translateY(${(1 - k) * 80}px) scale(${0.7 + 0.3 * k})`,
        opacity: Math.min(1, k * 2),
        filter: `blur(${Math.max(0, 1 - k) * 12}px)`,
      }}
    >
      {accent ? <Accent>{children}</Accent> : children}
    </span>
  )
}

const Kinetic: FC = () => {
  const f = useCurrentFrame()
  const first = f < 60
  const zoom = interpolate(f, [60, 120], [1, 1.08], clamp)
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      {first ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <Word at={0} size={150}>Nova versão</Word>
          <Word at={BEAT * 2} size={150} accent>do portfólio.</Word>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 60, alignItems: 'baseline', transform: `scale(${zoom})` }}>
          <Word at={60} size={145}>Dark.</Word>
          <Word at={75} size={145}>Dev.</Word>
          <Word at={90} size={145} color={C.accent}>
            Com IA<span style={{ color: C.primary }}>.</span>
          </Word>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 120, fontFamily: mono, fontSize: 24, color: C.muted, opacity: first ? 0 : 1 }}>
        Nuxt · Vue · TypeScript · Gemini
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 3. hero (10–14 s) */
const Hero: FC = () => {
  const f = useCurrentFrame()
  const tilt = useTilt(2)
  const zoom = interpolate(f, [40, 120], [1, 1.14], { ...clamp, easing: Easing.inOut(Easing.quad) })
  return (
    <AbsoluteFill>
      <SceneTitle kicker="01. hero" title={<>Primeira impressão <Accent>com cara de código.</Accent></>} />
      <div style={{ position: 'absolute', left: 260, top: 210, transform: tilt.transform, opacity: tilt.opacity, transformOrigin: '50% 0%' }}>
        <Browser width={BW} viewportH={VIEW_H} src="shots/hero.png" innerStyle={{ transform: `scale(${zoom})`, transformOrigin: '72% 35%' }} />
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 4. terminal com IA (14–18 s) */
const Terminal: FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const k = spring({ frame: f - 4, fps, config: { damping: 16, stiffness: 110 } })
  // revela o terminal linha a linha, no ritmo de colcheias
  const step = Math.floor(Math.max(0, f - 10) / (BEAT / 2))
  const reveal = Math.min(100, 18 + step * 9)
  const W = 900
  const H = W * (509 / 582)
  const float = Math.sin(f / 18) * 6
  const chips = ['whoami', 'experience', 'cat ReportChat.vue', '✦ Por que contratar o Gabriel?']

  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 140, top: 250, width: 720 }}>
        <SceneTitle x={0} y={0} size={72} kicker="terminal com IA" title={<>Pergunte.<br /><Accent>A IA responde.</Accent></>} />
        <p
          style={{
            position: 'absolute',
            top: 230,
            width: 640,
            fontFamily: text,
            fontSize: 28,
            lineHeight: 1.5,
            color: C.muted,
            opacity: interpolate(f, [20, 32], [0, 1], clamp),
          }}
        >
          Comandos de verdade ou qualquer pergunta sobre o Gabriel, respondida com base no currículo dele.
        </p>
        <div style={{ position: 'absolute', top: 420, display: 'flex', flexWrap: 'wrap', gap: 12, width: 680 }}>
          {chips.map((c, i) => {
            const ck = spring({ frame: f - 40 - i * (BEAT / 2), fps, config: { damping: 12, stiffness: 220 } })
            const ai = c.startsWith('✦')
            return (
              <span
                key={c}
                style={{
                  fontFamily: mono,
                  fontSize: 20,
                  padding: '10px 18px',
                  borderRadius: 99,
                  color: ai ? C.accent : C.text,
                  border: `1px solid ${ai ? 'rgba(187,153,255,.45)' : 'rgba(242,242,242,.16)'}`,
                  background: ai ? 'rgba(187,153,255,.1)' : 'rgba(242,242,242,.04)',
                  transform: `scale(${ck})`,
                  opacity: ck,
                }}
              >
                {c}
              </span>
            )
          })}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 120,
          top: (1080 - H) / 2 + float,
          width: W,
          height: H,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 50px 140px rgba(0,0,0,.65), 0 0 120px rgba(111,0,255,.4)',
          transform: `perspective(2000px) rotateY(${(1 - k) * -35 - 6}deg) translateX(${(1 - k) * 300}px)`,
          opacity: k,
        }}
      >
        <Img src={staticFile('shots/terminal.png')} style={{ width: W, display: 'block' }} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: `${reveal}%`,
            background: '#1a1a1a',
          }}
        />
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 5. experiência (18–22 s) */
const Experience: FC = () => {
  const f = useCurrentFrame()
  const tilt = useTilt(0)
  const maxScroll = 3008 * SHOT - VIEW_H
  const scroll = interpolate(f, [14, 116], [0, maxScroll * 0.92], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  return (
    <AbsoluteFill>
      <SceneTitle kicker="git log --carreira" title={<>4+ anos de produto real. <Accent>Equifax, Polo Trial, Bússola Social.</Accent></>} size={48} />
      <div style={{ position: 'absolute', left: 260, top: 210, transform: tilt.transform, opacity: tilt.opacity, transformOrigin: '50% 0%' }}>
        <Browser width={BW} viewportH={VIEW_H} src="shots/cv.png" scroll={scroll} />
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 6. stack (22–24 s) */
const Stack: FC = () => {
  const f = useCurrentFrame()
  const zoom = interpolate(f, [0, 60], [1.25, 1], { ...clamp, easing: Easing.out(Easing.cubic) })
  const scroll = interpolate(f, [0, 60], [0, 1226 * SHOT - VIEW_H], { ...clamp, easing: Easing.inOut(Easing.quad) })
  return (
    <AbsoluteFill>
      <SceneTitle kicker="02. stack" title={<>Do banco de dados <Accent>à interface.</Accent></>} />
      <div style={{ position: 'absolute', left: 260, top: 210, transform: `scale(${zoom})`, transformOrigin: '50% 30%' }}>
        <Browser width={BW} viewportH={VIEW_H} src="shots/stack.png" scroll={scroll} />
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 7. projetos (24–28 s) */
const Projects: FC = () => {
  const f = useCurrentFrame()
  const tilt = useTilt(0)
  const scroll = interpolate(f, [10, 100], [0, 1765 * SHOT - VIEW_H], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  const names = ['CL Academy', 'Acanto GR', 'Marechal Segurança', 'Carvalho Freire']
  return (
    <AbsoluteFill>
      <SceneTitle kicker="03. projetos" title={<>Sites e apps no ar, <Accent>para clientes reais.</Accent></>} />
      <div style={{ position: 'absolute', left: 260, top: 210, transform: tilt.transform, opacity: tilt.opacity, transformOrigin: '50% 0%' }}>
        <Browser width={BW} viewportH={VIEW_H} src="shots/projects.png" scroll={scroll} />
      </div>
      <div style={{ position: 'absolute', right: 70, top: 260, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
        {names.map((n, i) => {
          const at = 30 + i * BEAT
          const k = interpolate(f, [at, at + 8], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) })
          return (
            <span
              key={n}
              style={{
                fontFamily: mono,
                fontSize: 19,
                color: C.text,
                padding: '10px 16px',
                borderRadius: 10,
                background: C.primary,
                boxShadow: '0 12px 40px rgba(111,0,255,.5)',
                transform: `translateX(${(1 - k) * 120}px)`,
                opacity: k,
              }}
            >
              ↗ {n}
            </span>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 8. responsivo + idiomas (28–32 s) */
const Responsive: FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const p1 = spring({ frame: f - 2, fps, config: { damping: 16, stiffness: 100 } })
  const p2 = spring({ frame: f - 10, fps, config: { damping: 16, stiffness: 100 } })
  const langs = ['PT', 'EN', 'ES']
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 160, top: 300, width: 860, whiteSpace: 'nowrap' }}>
        <SceneTitle x={0} y={0} size={80} kicker="responsivo · trilíngue" title={<>Em qualquer tela.<br /><Accent>Em 3 idiomas.</Accent></>} />
        <div style={{ position: 'absolute', top: 300, display: 'flex', gap: 18 }}>
          {langs.map((l, i) => {
            const k = spring({ frame: f - 30 - i * BEAT, fps, config: { damping: 9, stiffness: 240 } })
            return (
              <span
                key={l}
                style={{
                  fontFamily: mono,
                  fontWeight: 500,
                  fontSize: 34,
                  width: 96,
                  height: 72,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 14,
                  color: i === 0 ? C.text : C.accent,
                  background: i === 0 ? C.primary : 'rgba(187,153,255,.1)',
                  border: `1px solid ${i === 0 ? C.primary : 'rgba(187,153,255,.4)'}`,
                  transform: `scale(${k})`,
                }}
              >
                {l}
              </span>
            )
          })}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1050,
          top: 90 + (1 - p1) * 900 + Math.sin(f / 20) * 8,
          transform: 'rotate(-6deg)',
        }}
      >
        <Phone src="shots/mobile-hero.png" width={380} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1440,
          top: 170 + (1 - p2) * 900 + Math.cos(f / 22) * 8,
          transform: 'rotate(5deg)',
        }}
      >
        <Phone src="shots/mobile-projects.png" width={350} />
      </div>
    </AbsoluteFill>
  )
}

/* ============================================================ 9. encerramento (32–38 s) */
const Outro: FC = () => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const hit = T.finalHit - T.outro // 60
  const textOut = interpolate(f, [40, 48], [1, 0], clamp)
  const links = spring({ frame: f - hit - 20, fps, config: { damping: 16, stiffness: 120 } })
  const fade = interpolate(f, [150, 180], [1, 0], clamp)
  const punch = f >= hit ? 1 + 0.06 * Math.exp(-(f - hit) / 4) : 1

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      {f < 50 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: textOut, gap: 20 }}>
          <Word at={0} size={140}>Vamos construir</Word>
          <Word at={BEAT * 2} size={140} accent>algo juntos?</Word>
        </AbsoluteFill>
      )}
      {f >= 44 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ transform: `translateY(-60px) scale(${punch})` }}>
            <Logo width={900} glowFrom={hit} timing={{ w0: 44, w1: 46, w2: 48, w3: 50, w4: 52, p0_0: 54, p0_1: 56, p1_0: hit - 5 }} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 680,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
              opacity: links,
              transform: `translateY(${(1 - links) * 30}px)`,
            }}
          >
            <div style={{ fontFamily: display, fontWeight: 500, fontSize: 40, color: C.text }}>Gabriel Santos · Software Engineer Full Stack</div>
            <div style={{ fontFamily: mono, fontSize: 24, color: C.accent, display: 'flex', gap: 36 }}>
              <span>github.com/gabriel-santosdev</span>
              <span style={{ color: '#737373' }}>/</span>
              <span>linkedin.com/in/devgabrielsantos</span>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}

/* ============================================================ montagem */
const scenes: { from: number; to: number; C: FC }[] = [
  { from: T.intro, to: T.kinetic, C: Intro },
  { from: T.kinetic, to: T.hero, C: Kinetic },
  { from: T.hero, to: T.terminal, C: Hero },
  { from: T.terminal, to: T.cv, C: Terminal },
  { from: T.cv, to: T.stack, C: Experience },
  { from: T.stack, to: T.projects, C: Stack },
  { from: T.projects, to: T.responsive, C: Projects },
  { from: T.responsive, to: T.outro, C: Responsive },
  { from: T.outro, to: TOTAL, C: Outro },
]

export const Promo: FC = () => (
  <AbsoluteFill style={{ background: C.bg, fontFamily: text }}>
    <Audio src={staticFile('music.wav')} />
    <Background />
    <BeatPulse />
    {scenes.map(({ from, to, C: Scene }) => (
      <Sequence key={from} from={from} durationInFrames={to - from}>
        <Scene />
      </Sequence>
    ))}
    <Flash at={T.drop} />
    <Flash at={T.finalHit} />
    <SlashWipe at={T.kinetic} />
    <SlashWipe at={T.hero} reverse tone="accent" />
    <SlashWipe at={T.terminal} />
    <SlashWipe at={T.cv} reverse />
    <SlashWipe at={T.stack} tone="accent" />
    <SlashWipe at={T.projects} reverse />
    <SlashWipe at={T.responsive} />
    <SlashWipe at={T.outro} reverse tone="accent" />
  </AbsoluteFill>
)
