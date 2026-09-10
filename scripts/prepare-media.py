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
parser.add_argument('--thesis', type=Path, help='Optional thesis PDF, when regenerating its figure too')
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
}
for name, source in stills.items():
    run('-i', args.game / source, '-c:v', 'libwebp', '-quality', '90', images / f'{name}.webp')

# Only the two environments approved by Max are included in the slideshow.
# This is an explicitly labeled slideshow, not gameplay footage.
inputs = []
for name in ['forest', 'market', 'forest']:
    inputs += ['-loop', '1', '-framerate', '24', '-t', '5', '-i', str(images / f'{name}.webp')]
filters = ';'.join(f'[{i}:v]scale=1280:720,format=yuv420p,setsar=1,settb=1/24[v{i}]' for i in range(3))
filters += ';[v0][v1]xfade=transition=fade:duration=1:offset=4[x1];[x1][v2]xfade=transition=fade:duration=1:offset=8[out]'
run(*inputs, '-filter_complex', filters, '-map', '[out]', '-t', '12', '-an', '-c:v', 'libx264',
    '-crf', '25', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', media / 'evensong-environments.mp4')

# A small shareable GIF is separate from the more efficient on-page MP4.
run('-i', media / 'evensong-environments.mp4', '-t', '12', '-filter_complex',
    'fps=6,scale=640:360:flags=neighbor,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer',
    '-loop', '0', media / 'evensong-environments.gif')

if args.thesis:
    with tempfile.TemporaryDirectory() as temp:
        diagram = Path(temp) / 'landmarks.png'
        diagram.write_bytes(PdfReader(args.thesis).pages[9].images[0].data)
        run('-i', diagram, '-c:v', 'libwebp', '-quality', '88', root / 'public/images/fimo-hand-landmarks.webp')

manifest = {
    'prepared': '2026-09-10',
    'game_repository': 'MaxLuisRodriguez/evensong (private; source is not distributed)',
    'stills': stills,
    'approved_selection': 'Max approved Ember Market and Glasswood for the environment gallery and slideshow. A separately requested boss preview is documented in boss-preview-provenance.json.',
    'edits': '12-second silent slideshow with crossfades between only the two approved in-game stills. MP4: 24 fps. GIF: 6 fps, 640 x 360. No gameplay footage.',
    'thesis_figure': 'Figure from PDF page 10, extracted without content edits.',
    'outputs': {p.name: {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted([*(images / f'{name}.webp' for name in stills), media / 'evensong-environments.mp4', media / 'evensong-environments.gif'])},
}
(root / 'content/media-provenance.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({p.name: p.stat().st_size for p in sorted(media.glob('*'))}))
