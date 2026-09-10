"""Prepare portfolio media from Max's local thesis and Evensong captures.

Run with the bundled Python (pypdf, imageio-ffmpeg) and --game PATH --thesis PATH.
No game source or original media is changed.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

import imageio_ffmpeg
from pypdf import PdfReader

parser = argparse.ArgumentParser()
parser.add_argument('--game', type=Path, required=True)
parser.add_argument('--thesis', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
images = root / 'public/images/evensong'
media = root / 'public/media'
images.mkdir(parents=True, exist_ok=True)
media.mkdir(parents=True, exist_ok=True)
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()


def run(*options):
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', *map(str, options)], check=True)


stills = {
    'market': 'docs/game_overhaul/evidence/FINAL-VISUALS/final/market_lane.png',
    'forest': 'docs/game_overhaul/evidence/FINAL-VISUALS/after/glasswood_hearth_clearing.png',
    'water': 'docs/game_overhaul/evidence/FINAL-VISUALS/final/water-controls/glasswood_pools.png',
}
for name, source in stills.items():
    run('-i', args.game / source, '-c:v', 'libwebp', '-quality', '90', images / f'{name}.webp')

clips = {
    'hearth': 'docs/game_overhaul/evidence/OVERNIGHT-VISUALS/native-final-normal/uninterrupted.mp4',
    'after': 'docs/game_overhaul/evidence/OVERNIGHT-VISUALS/native-final-after/uninterrupted.mp4',
}
for name, source in clips.items():
    run('-ss', '3', '-i', args.game / source, '-t', '9', '-an', '-vf', 'fps=24,scale=960:540:flags=neighbor',
        '-c:v', 'libx264', '-crf', '23', '-preset', 'medium', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', media / f'evensong-{name}.mp4')
    run('-ss', '1', '-i', media / f'evensong-{name}.mp4', '-frames:v', '1',
        '-c:v', 'libwebp', '-quality', '90', images / f'{name}.webp')

# An explicitly labeled animated still montage, not simulated gameplay.
inputs = []
for name in ['forest', 'market', 'water', 'forest']:
    inputs += ['-loop', '1', '-framerate', '24', '-t', '5', '-i', str(images / f'{name}.webp')]
filters = ';'.join(f'[{i}:v]scale=1280:720,format=yuv420p,setsar=1,settb=1/24[v{i}]' for i in range(4))
filters += ';[v0][v1]xfade=transition=fade:duration=1:offset=4[x1];[x1][v2]xfade=transition=fade:duration=1:offset=8[x2];[x2][v3]xfade=transition=fade:duration=1:offset=12[out]'
run(*inputs, '-filter_complex', filters, '-map', '[out]', '-t', '16', '-an', '-c:v', 'libx264',
    '-crf', '25', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', media / 'evensong-worlds.mp4')

# A small shareable GIF is separate from the more efficient on-page MP4.
run('-i', media / 'evensong-hearth.mp4', '-t', '6', '-filter_complex',
    'fps=10,scale=640:360:flags=neighbor,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer',
    '-loop', '0', media / 'evensong-hearth.gif')

with tempfile.TemporaryDirectory() as temp:
    diagram = Path(temp) / 'landmarks.png'
    diagram.write_bytes(PdfReader(args.thesis).pages[9].images[0].data)
    run('-i', diagram, '-c:v', 'libwebp', '-quality', '88', root / 'public/images/fimo-hand-landmarks.webp')

manifest = {
    'prepared': '2026-09-10',
    'game_repository': 'MaxLuisRodriguez/evensong (private; source is not distributed)',
    'stills': stills,
    'gameplay_sources': clips,
    'edits': 'Gameplay: seconds 3-12, silent, 24 fps. Worlds: crossfades between in-game stills. GIF: first six seconds of hearth edit.',
    'thesis_figure': 'Figure from PDF page 10, extracted without content edits.',
    'outputs': {p.name: {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted([*images.glob('*.webp'), *media.glob('*')])},
}
(root / 'content/media-provenance.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({p.name: p.stat().st_size for p in sorted(media.glob('*'))}))
