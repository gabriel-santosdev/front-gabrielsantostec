"""
Trilha original synthwave para o vídeo do portfólio (sintetizada do zero, sem samples).
120 BPM -> 1 tempo = 0,5 s = 15 frames a 30 fps; 1 compasso = 2 s = 60 frames.
Os cortes do vídeo (src/timeline.ts) caem nos compassos desta faixa.

Gera public/music.wav
"""
import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
TOTAL = 38.0          # segundos
DROP = 2 * BAR        # 4 s: barra do logo bate
LEAD_IN = 6 * BAR     # 12 s
OUTRO = 16 * BAR      # 32 s
FINAL_HIT = 17 * BAR  # 34 s
N = int(TOTAL * SR)
rng = np.random.default_rng(7)


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def buf():
    return np.zeros(N)


def add(dst, src, at):
    i = int(at * SR)
    if i >= N:
        return
    j = min(N, i + len(src))
    dst[i:j] += src[: j - i]


def env(n, a=0.005, d=0.1, s=0.0, r=0.05, hold=None):
    """ADSR simples; hold = duração (s) antes do release."""
    t = np.arange(n) / SR
    hold = hold if hold is not None else n / SR - r
    e = np.where(t < a, t / max(a, 1e-6), s + (1 - s) * np.exp(-(t - a) / max(d, 1e-6)))
    rel = np.clip(1 - (t - hold) / max(r, 1e-6), 0, 1)
    return e * np.where(t > hold, rel, 1)


def saw(freq, dur, detune=0.0, voices=1, phase_rand=True):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for v in range(voices):
        cents = (v - (voices - 1) / 2) * detune
        f = freq * 2 ** (cents / 1200)
        ph = rng.random() if phase_rand else 0
        out += signal.sawtooth(2 * np.pi * (f * t + ph))
    return out / voices


def lowpass(x, cutoff, order=2):
    sos = signal.butter(order, min(cutoff, SR / 2 - 100), 'low', fs=SR, output='sos')
    return signal.sosfilt(sos, x)


def highpass(x, cutoff, order=2):
    sos = signal.butter(order, cutoff, 'high', fs=SR, output='sos')
    return signal.sosfilt(sos, x)


def bandpass(x, lo, hi, order=2):
    sos = signal.butter(order, [lo, hi], 'band', fs=SR, output='sos')
    return signal.sosfilt(sos, x)


def sweep_lowpass(x, cutoff_fn, block=256):
    """Lowpass com cutoff variando no tempo (cutoff_fn(t_segundos))."""
    out = np.zeros_like(x)
    zi = np.zeros((1, 2))
    for i in range(0, len(x), block):
        fc = float(np.clip(cutoff_fn(i / SR), 60, SR / 2 - 200))
        sos = signal.butter(2, fc, 'low', fs=SR, output='sos')
        out[i:i + block], zi = signal.sosfilt(sos, x[i:i + block], zi=zi)
    return out


def reverb(x, seconds=2.2, mix=0.25, pre=0.02):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 6.9 / seconds)
    ir = lowpass(ir, 6000)
    ir[: int(pre * SR)] = 0
    ir /= np.sqrt(np.sum(ir ** 2))
    wet = signal.fftconvolve(x, ir)[: len(x)]
    return x * (1 - mix) + wet * mix * 1.4


def delay(x, time, fb=0.35, mix=0.3):
    d = int(time * SR)
    out = x.copy()
    tap = x.copy()
    for _ in range(5):
        tap = np.concatenate([np.zeros(d), tap[:-d]]) * fb
        out += tap * mix
    return out


# ---------------------------------------------------------------- harmonia
CHORDS = [  # Am, F, C, G
    dict(root=33, notes=[57, 60, 64, 69]),
    dict(root=29, notes=[53, 57, 60, 65]),
    dict(root=36, notes=[55, 60, 64, 67]),
    dict(root=31, notes=[55, 59, 62, 67]),
]
NBARS = int(np.ceil(TOTAL / BAR))


def chord_at(bar):
    return CHORDS[bar % 4]


# ---------------------------------------------------------------- pad
pad = buf()
for b in range(NBARS):
    ch = chord_at(b)
    dur = BAR + 0.6
    tone = sum(saw(mtof(m), dur, detune=14, voices=3) for m in ch['notes'])
    tone = lowpass(tone, 1600 if b >= 2 else 900)
    tone *= env(len(tone), a=0.35, d=10, s=1, r=0.6, hold=BAR)
    add(pad, tone * 0.11, b * BAR)
pad = sweep_lowpass(pad, lambda t: 500 + 3500 * min(t / DROP, 1) if t < OUTRO + 2 else max(400, 4000 - (t - OUTRO - 2) * 900))

# ---------------------------------------------------------------- arp (16 avos)
arp = buf()
pattern = [0, 1, 2, 3, 2, 1, 0, 2, 3, 2, 1, 3, 0, 1, 2, 3]
step = BEAT / 4
for b in range(NBARS):
    ch = chord_at(b)
    for k in range(16):
        t0 = b * BAR + k * step
        if t0 >= TOTAL - 1.5:
            break
        m = ch['notes'][pattern[k]] + 12
        n = saw(mtof(m), 0.22, detune=8, voices=2)
        n *= env(len(n), a=0.002, d=0.09, s=0.0, r=0.02)
        add(arp, n * (0.16 if k % 4 == 0 else 0.11), t0)
arp = sweep_lowpass(arp, lambda t: 250 * (16 ** min(t / DROP, 1)) if t < DROP else (5200 if t < OUTRO + 2 else max(600, 5200 - (t - OUTRO - 2) * 1300)))
arp = delay(arp, BEAT * 0.75, fb=0.3, mix=0.35)

# ---------------------------------------------------------------- baixo
bass = buf()
for b in range(2, NBARS):
    t_bar = b * BAR
    if t_bar >= FINAL_HIT + BAR:
        break
    r = chord_at(b)['root']
    for k in range(8):
        t0 = t_bar + k * BEAT / 2
        m = r + (12 if k % 2 else 0)
        n = saw(mtof(m), 0.24, detune=6, voices=2) + 0.6 * np.sin(2 * np.pi * mtof(r) * np.arange(int(0.24 * SR)) / SR)
        n = lowpass(n, 700)
        n *= env(len(n), a=0.004, d=0.14, s=0.35, r=0.04, hold=0.2)
        add(bass, n * 0.28, t0)

# ---------------------------------------------------------------- bateria
def kick(big=False):
    dur = 0.9 if big else 0.42
    t = np.arange(int(dur * SR)) / SR
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * (3.2 if big else 7.5))
    click = rng.standard_normal(len(t)) * np.exp(-t * 300) * 0.25
    return np.tanh((body + click) * 1.6)


def clap():
    dur = 0.35
    t = np.arange(int(dur * SR)) / SR
    noise = bandpass(rng.standard_normal(len(t)), 900, 5000)
    e = np.exp(-t * 18)
    for off in (0.0, 0.011, 0.022):  # ataques múltiplos de palma
        e += np.exp(-np.clip(t - off, 0, None) * 120) * (t >= off) * 0.6
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30) * 0.4
    return (noise * e * 0.5 + tone)


def hat(open_=False):
    dur = 0.25 if open_ else 0.06
    t = np.arange(int(dur * SR)) / SR
    return highpass(rng.standard_normal(len(t)), 7000) * np.exp(-t * (14 if open_ else 70))


def crash(dur=2.5):
    t = np.arange(int(dur * SR)) / SR
    return highpass(rng.standard_normal(len(t)), 4000) * np.exp(-t * 2.2)


drums = buf()
kicks = buf()  # para sidechain
for b in range(2, NBARS):
    t_bar = b * BAR
    if t_bar >= FINAL_HIT:
        break
    fill = b in (9, 15)
    for k in range(4):
        tk = t_bar + k * BEAT
        add(kicks, kick(big=(tk == DROP or tk == OUTRO)), tk)
        if k in (1, 3):
            add(drums, clap() * 0.55, tk)
        add(drums, hat(open_=True) * 0.10, tk + BEAT / 2)
        for s in (1, 3):
            add(drums, hat() * 0.06, tk + s * BEAT / 4)
    if fill:  # rufada de caixa no último tempo
        for s in range(8):
            add(drums, clap() * (0.2 + 0.05 * s), t_bar + 3 * BEAT + s * BEAT / 8)

# riser + rufada da introdução
t = np.arange(int(DROP * SR)) / SR
riser = rng.standard_normal(len(t))
riser = sweep_lowpass(riser, lambda tt: 300 + 9000 * (tt / DROP) ** 2)
riser = highpass(riser, 200) * (t / DROP) ** 2.2 * 0.22
add(drums, riser, 0)
roll_t = BAR + BEAT * 2  # 3 s
for s in range(16):
    add(drums, clap() * (0.08 + 0.025 * s), roll_t + s * (BEAT * 2 / 16))

# impactos (drop, 32 s e acorde final 34 s)
for at in (DROP, OUTRO, FINAL_HIT):
    add(drums, crash(3.0) * 0.32, at)
    t = np.arange(int(2.5 * SR)) / SR
    boom = np.sin(2 * np.pi * (38 + 30 * np.exp(-t * 10)) * t) * np.exp(-t * 1.6)
    add(kicks, boom * 0.8, at)
add(kicks, kick(big=True), FINAL_HIT)

# ---------------------------------------------------------------- lead
MELODY = [  # 8 colcheias por compasso; None = sustenta
    [76, None, None, 79, None, 76, 74, None],
    [72, None, None, 74, None, 72, 69, None],
    [72, None, None, 76, None, 79, 81, None],
    [79, None, None, 74, None, None, 71, 74],
]
lead = buf()
for b in range(6, 16):
    phrase = MELODY[b % 4]
    k = 0
    while k < 8:
        m = phrase[k]
        if m is None:
            k += 1
            continue
        length = 1
        while k + length < 8 and phrase[k + length] is None:
            length += 1
        dur = length * BEAT / 2
        tt = np.arange(int((dur + 0.15) * SR)) / SR
        vib = 1 + 0.004 * np.sin(2 * np.pi * 5.5 * tt) * np.clip((tt - 0.15) * 4, 0, 1)
        f = mtof(m) * vib
        ph = np.cumsum(f) / SR
        tone = signal.sawtooth(2 * np.pi * ph) * 0.6 + signal.square(2 * np.pi * ph * 1.003) * 0.4
        tone = lowpass(tone, 3200)
        tone *= env(len(tone), a=0.01, d=0.3, s=0.7, r=0.12, hold=dur)
        add(lead, tone * 0.12, b * BAR + k * BEAT / 2)
        k += length
lead = delay(lead, BEAT * 0.75, fb=0.35, mix=0.4)
lead = reverb(lead, 2.0, mix=0.3)

# ---------------------------------------------------------------- mix
t = np.arange(N) / SR
# sidechain: "bombeia" pad/arp/baixo a cada bumbo depois do drop
beat_phase = (t % BEAT) / BEAT
duck = 1 - 0.6 * np.exp(-beat_phase * 9)
duck = np.where((t >= DROP) & (t < FINAL_HIT), duck, 1)

music = (pad * duck + arp * (0.4 + 0.6 * duck))
music = reverb(music, 2.6, mix=0.28)
mix = music + bass * duck + lead + reverb(drums, 1.2, mix=0.12) + kicks * 0.55

# fade final
fade = np.clip((TOTAL - t) / 2.5, 0, 1)
mix *= fade
mix = np.tanh(mix * 1.15)
mix /= np.max(np.abs(mix)) / 0.89

# estéreo leve: atraso Haas no pad/arp
right = mix.copy()
left = mix.copy()
wide = reverb(music, 3.0, mix=1.0) * 0.12 * fade
left += wide
right += np.concatenate([np.zeros(int(0.012 * SR)), wide[: -int(0.012 * SR)]])
stereo = np.stack([left, right], axis=1)
stereo /= np.max(np.abs(stereo)) / 0.89
wavfile.write('public/music.wav', SR, (stereo * 32767).astype(np.int16))
print('ok', TOTAL, 's')
