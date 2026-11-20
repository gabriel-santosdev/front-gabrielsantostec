"""Recorta public/logo-gs.png do site em peças (uma por letra/forma) para animar no vídeo."""
import json, numpy as np
from PIL import Image
src = Image.open('../public/logo-gs.png').convert('RGBA')
a = np.array(src)
W, H = src.size
alpha = a[..., 3] > 20
purple = alpha & (a[..., 2] > 150) & (a[..., 0] < 180)
white = alpha & ~purple

def runs(mask1d):
    out, start = [], None
    for i, v in enumerate(list(mask1d) + [False]):
        if v and start is None: start = i
        if not v and start is not None: out.append((start, i)); start = None
    return out

pieces = []
def save(name, mask, x0, x1, y0=0, y1=H):
    sub = np.zeros_like(a)
    m = np.zeros_like(mask); m[y0:y1, x0:x1] = mask[y0:y1, x0:x1]
    ys, xs = np.where(m)
    bx0, bx1, by0, by1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    sub[m] = a[m]
    Image.fromarray(sub[by0:by1, bx0:bx1]).save(f'public/logo/{name}.png')
    pieces.append(dict(name=name, x=int(bx0), y=int(by0), w=int(bx1 - bx0), h=int(by1 - by0)))

for i, (x0, x1) in enumerate(runs(white.any(axis=0))):
    save(f'w{i}', white, x0, x1)
for i, (x0, x1) in enumerate(runs(purple.any(axis=0))):
    cols = purple[:, x0:x1].any(axis=1)
    for j, (y0, y1) in enumerate(runs(cols)):
        save(f'p{i}_{j}', purple, x0, x1, y0, y1)
json.dump(dict(width=W, height=H, pieces=pieces), open('src/logoPieces.json', 'w'), indent=1)
print(W, H); [print(p) for p in pieces]
