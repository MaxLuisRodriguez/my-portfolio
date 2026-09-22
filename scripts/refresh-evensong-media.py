"""Prepare the September 22 portfolio captures; game originals stay untouched."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', required=True)
parser.add_argument('--documents', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
images = root / 'public/images/evensong'
media = root / 'public/media'
records = []

def run(*options):
    subprocess.run([args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
                    '-threads', '2', *map(str, options)], check=True)

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

stills = [('01-Mountain-bridges-actual-gameplay.png', 'mountain-bridges.png'),
          ('03-Vestry-void-bridge-actual-gameplay.png', 'vestry.png'),
          ('02-Pikes-Span-actual-gameplay.png', 'pikes-span.png')]
for original, name in stills:
    source = args.documents / 'EVENSONG-shareable-gameplay-2026-09-22' / original
    target = images / name
    shutil.copyfile(source, target)
    assert sha(source) == sha(target)
    records.append({'source': str(source.relative_to(args.documents)), 'output': str(target.relative_to(root)), 'sha256': sha(target)})

with tempfile.TemporaryDirectory() as temp:
    listing = Path(temp) / 'stills.txt'
    listing.write_text(''.join(f"file '{(images / name).as_posix()}'\nduration 4\n" for _, name in stills)
                       + f"file '{(images / stills[-1][1]).as_posix()}'\n", encoding='utf-8')
    run('-f', 'concat', '-safe', '0', '-i', listing, '-t', '12', '-an', '-vf',
        'scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,fps=24',
        '-c:v', 'libx264', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', media / 'evensong-environments.mp4')

clips = [
    ('warden', 'evensong-art-surfaces/docs/campaign/evidence/western-next/warden-island-v3/after4-final/normal-input.mp4', 53, 12),
    ('choir', 'evensong-astra-build/docs/campaign/evidence/wave3-choir-shadow-integration-20260922/choir-shadow-campaign.mp4', 40, 12),
]
for name, relative, start, duration in clips:
    source = args.documents / relative
    target = media / f'evensong-{name}.mp4'
    run('-ss', start, '-i', source, '-t', duration, '-an', '-vf', 'fps=24', '-c:v', 'libx264',
        '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target)
    run('-i', target, '-frames:v', 1, images / f'{name}-fight.png')
    records.append({'source': relative, 'sourceSha256': sha(source), 'startSeconds': start,
                    'durationSeconds': duration, 'output': str(target.relative_to(root)), 'sha256': sha(target)})

for name in ['environments', 'warden', 'choir']:
    run('-i', media / f'evensong-{name}.mp4', '-filter_complex',
        'fps=12,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer',
        '-loop', 0, media / f'evensong-{name}.gif')

manifest = {'date': '2026-09-22', 'portfolioBase': '613f37bf32c39bebf5d7b756508aac08545282ab',
            'notes': 'User-selected development screenshots copied byte-for-byte. Environment video is a slideshow. Boss excerpts are automated native gameplay recordings, trimmed at original playback speed with no crop or generated motion. Silent MP4s with matching downloadable GIFs; not a release-readiness claim.',
            'inputs': records,
            'outputs': {str(p.relative_to(root)): {'bytes': p.stat().st_size, 'sha256': sha(p)}
                        for p in [*(images / n for _, n in stills), *(images / f'{n}-fight.png' for n, *_ in clips),
                                  *(media / f'evensong-{n}.{ext}' for n in ['environments', 'warden', 'choir'] for ext in ['mp4', 'gif'])]}}
(root / 'content/evensong-refresh-20260922.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print('Prepared three original screenshots, two 12-second boss excerpts, and matching GIFs.')
