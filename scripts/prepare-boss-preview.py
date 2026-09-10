"""Encode an existing timestamped boss capture without changing game files."""
import argparse
import csv
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import imageio_ffmpeg

parser = argparse.ArgumentParser()
parser.add_argument('--capture', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
media = root / 'public/media'
poster = root / 'public/images/evensong/warden.webp'
rows = list(csv.DictReader((args.capture / 'frames.csv').open(encoding='utf-8')))
start = next(i for i, row in enumerate(rows) if row['file'] == 'f002134.png')
end = next(i for i, row in enumerate(rows) if row['file'] == 'f002388.png')
selected = rows[start:end + 1]
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

def run(*options):
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', *map(str, options)], check=True)

with tempfile.TemporaryDirectory() as temp:
    concat = Path(temp) / 'frames.txt'
    lines = []
    for index, row in enumerate(selected):
        source = (args.capture / row['file']).resolve()
        if "'" in str(source):
            raise ValueError('Capture path contains an unsupported quote')
        following = rows[start + index + 1]
        duration = (int(following['elapsed_us']) - int(row['elapsed_us'])) / 1_000_000
        assert duration > 0
        lines += [f"file '{source.as_posix()}'", f'duration {duration:.6f}']
    lines.append(f"file '{(args.capture / selected[-1]['file']).resolve().as_posix()}'")
    concat.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    duration = (int(rows[end + 1]['elapsed_us']) - int(selected[0]['elapsed_us'])) / 1_000_000
    run('-f', 'concat', '-safe', '0', '-i', concat, '-t', duration, '-an', '-vf', 'fps=30',
        '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', media / 'evensong-warden.mp4')
run('-i', args.capture / 'f002300.png', '-c:v', 'libwebp', '-quality', '92', poster)
run('-i', media / 'evensong-warden.mp4', '-filter_complex',
    'fps=12,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer',
    '-loop', '0', media / 'evensong-warden.gif')
outputs = [poster, media / 'evensong-warden.mp4', media / 'evensong-warden.gif']
manifest = {
    'prepared': '2026-09-10',
    'authorization': 'Max requested a short preview of the most polished available boss fight, labeled In progress.',
    'capture': 'evensong-combat/artifacts/overnight-combat/warden-face-assisted',
    'sequence': 'Warden round 2: f002134.png through f002388.png',
    'timing': 'Original frames.csv elapsed_us intervals preserved; sampled at 30 fps for MP4, 12 fps for GIF. No generated motion or speed changes.',
    'duration_seconds': duration,
    'capture_settings': 'Native 640 x 360; DodgeAssist, ReducedMotion, TextScale 2. Automated engine gameplay capture, not a human-play recording.',
    'presentation': 'Development footage. Existing boss silhouette/background contrast remains in progress. Environment gallery retains only approved Ember Market and Glasswood.',
    'outputs': {p.name: {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in outputs},
}
(root / 'content/boss-preview-provenance.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps(manifest, indent=2))
