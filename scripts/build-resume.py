"""Generate the public HTML and PDF resume from one reviewed content source."""
import html
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

root = Path(__file__).resolve().parents[1]
d = json.loads((root / 'content/resume.json').read_text(encoding='utf-8'))
out = root / 'public'
esc = html.escape

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=23, leading=27, textColor=colors.HexColor('#20242b'), alignment=TA_CENTER, spaceAfter=3),
    'headline': ParagraphStyle('headline', fontName='Helvetica', fontSize=10, leading=13, alignment=TA_CENTER, spaceAfter=4),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9, leading=12, alignment=TA_CENTER, spaceAfter=8),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9.3, leading=12, textColor=colors.HexColor('#a40b16'), spaceBefore=6, spaceAfter=4),
    'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=10, leading=11.5, spaceAfter=1),
    'role': ParagraphStyle('role', fontName='Helvetica-Oblique', fontSize=9.2, leading=10.8, spaceAfter=2),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=11.4, spaceAfter=3),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.5, leading=11.4, leftIndent=9, firstLineIndent=-9, spaceAfter=2),
}


def para(text, style='body'):
    return Paragraph(text, styles[style])


story = [para(esc(d['name']), 'name'), para(esc(d['headline']), 'headline'),
         para(f'<link href="mailto:{d["email"]}">{d["email"]}</link>  |  <link href="{d["website"]}">Portfolio</link>  |  <link href="{d["github"]}">GitHub</link>  |  <link href="{d["linkedin"]}">LinkedIn</link>', 'contact')]
story.append(para('EDUCATION', 'section'))
for e in d['education']:
    story.append(KeepTogether([para(f'{esc(e["degree"])} <font name="Helvetica">| {esc(e["date"])}</font>', 'title'), para(esc(e['detail']))]))
story.append(para('EXPERIENCE', 'section'))
for e in d['experience']:
    block = [para(f'{esc(e["organization"])} <font name="Helvetica">| {esc(e["date"])}</font>', 'title'), para(esc(e['role']), 'role')]
    block += [para('- ' + esc(b), 'bullet') for b in e['bullets']]
    block.append(Spacer(1, 1))
    story.append(KeepTogether(block))
story.append(para('RESEARCH & PROJECTS', 'section'))
for p in d['research']:
    body = esc(p['text'])
    if p.get('link'):
        body += f' <link color="#a40b16" href="{p["link"]}">{esc(p["linkLabel"])}</link>.'
    story.append(KeepTogether([para(esc(p['title']), 'title'), para(body), Spacer(1, 1)]))
story.append(para('SKILLS & RECOGNITION', 'section'))
for s in d['skills']:
    story.append(para(f'<b>{esc(s["label"])}:</b> {esc(s["text"])}'))

doc = SimpleDocTemplate(str(out / 'Max-Rodriguez-Resume.pdf'), pagesize=letter, rightMargin=42, leftMargin=42,
                        topMargin=32, bottomMargin=30, title='Max Rodriguez - Resume, September 2026', author='Max Rodriguez')
doc.build(story)

# Readable on screen; native browser printing remains available as well as the PDF.
sections = []
sections.append('<section><h2>Education</h2>' + ''.join(f'<article><div class="row"><h3>{esc(e["degree"])}</h3><span>{esc(e["date"])}</span></div><p>{esc(e["detail"])}</p></article>' for e in d['education']) + '</section>')
sections.append('<section><h2>Experience</h2>' + ''.join(f'<article><div class="row"><h3>{esc(e["organization"])}</h3><span>{esc(e["date"])}</span></div><p class="role">{esc(e["role"])}</p><ul>' + ''.join(f'<li>{esc(b)}</li>' for b in e['bullets']) + '</ul></article>' for e in d['experience']) + '</section>')
sections.append('<section><h2>Research & projects</h2>' + ''.join(f'<article><h3>{esc(p["title"])}</h3><p>{esc(p["text"])}</p>' + (f'<a href="{p["link"]}">{esc(p["linkLabel"])}</a>' if p.get('link') else '') + '</article>' for p in d['research']) + '</section>')
sections.append('<section><h2>Skills & recognition</h2>' + ''.join(f'<p><strong>{esc(s["label"])}:</strong> {esc(s["text"])}</p>' for s in d['skills']) + '</section>')
page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f8f9fa"><meta name="description" content="Max Rodriguez's September 2026 resume: Stanford CS, AI engineering, published honors research, and independent game development."><title>Max Rodriguez - Resume</title><link rel="icon" href="./favicon.svg"><link rel="canonical" href="{d['website']}/resume"><style>
@font-face{{font-family:Inter;src:url('./fonts/inter-latin.woff2') format('woff2');font-display:swap}}
*{{box-sizing:border-box}}body{{margin:0;background:#eef0f3;color:#20242b;font-family:Inter,Arial,sans-serif;line-height:1.7}}a{{color:#a40b16;text-underline-offset:4px;overflow-wrap:anywhere}}a:focus-visible{{outline:3px solid #2563eb;outline-offset:4px}}.toolbar{{max-width:920px;margin:auto;padding:24px;display:flex;justify-content:space-between;gap:16px;align-items:center}}.download{{padding:10px 16px;background:#20242b;color:white;border-radius:3px;text-decoration:none}}main{{max-width:880px;margin:0 auto 60px;background:white;padding:52px 60px;box-shadow:0 4px 30px #20242b0a}}header{{border-bottom:2px solid #20242b;padding-bottom:24px}}h1{{font-size:2.5rem;letter-spacing:-.035em;line-height:1.1;margin:0 0 12px}}.headline{{font-weight:500}}.links{{display:flex;gap:10px 20px;flex-wrap:wrap;margin-top:12px;font-size:.9rem}}h2{{font-size:.85rem;text-transform:uppercase;letter-spacing:.12em;color:#a40b16;border-bottom:1px solid #d9dce1;padding-bottom:8px;margin:32px 0 18px}}h3{{font-size:1rem;line-height:1.6;margin:0}}p{{margin:5px 0 8px}}article{{margin-bottom:22px}}.row{{display:flex;justify-content:space-between;gap:20px;align-items:baseline}}.row>span{{font-size:.85rem;white-space:nowrap;color:#5b626c}}.role{{color:#5b626c;font-size:.95rem}}ul{{padding-left:20px;margin:8px 0}}li{{margin-bottom:6px}}.updated{{font-size:.85rem;color:#5b626c;border-top:1px solid #d9dce1;padding-top:20px;margin-top:30px}}@media(max-width:650px){{main{{padding:30px 22px}}.toolbar{{padding:16px}}.row{{flex-direction:column;gap:0}}h1{{font-size:2rem}}}}@page{{size:letter;margin:.6in}}@media print{{.toolbar{{display:none}}body{{background:white;font-size:9.5pt;line-height:1.3}}main{{margin:0;padding:0;max-width:none;box-shadow:none}}h1{{font-size:23pt}}header{{padding-bottom:10px}}h2{{margin:14px 0 8px;font-size:9pt}}h3{{font-size:10pt}}article{{margin-bottom:10px;break-inside:avoid}}.row{{flex-direction:row}}.row>span,.role,.links{{font-size:9pt}}li{{margin-bottom:3px}}.updated{{font-size:8pt;margin-top:12px;padding-top:8px}}}}
</style></head><body><nav class="toolbar" aria-label="Resume actions"><a href="./">Back to portfolio</a><a class="download" href="./Max-Rodriguez-Resume.pdf" download>Download PDF</a></nav><main><header><h1>{esc(d['name'])}</h1><p class="headline">{esc(d['headline'])}</p><div class="links"><a href="mailto:{d['email']}">{d['email']}</a><a href="{d['website']}">Portfolio</a><a href="{d['github']}">GitHub</a><a href="{d['linkedin']}">LinkedIn</a></div></header>{''.join(sections)}<p class="updated">Updated {d['updated']}. For a compact one-page version, download the PDF.</p></main></body></html>'''
(out / 'resume.html').write_text(page, encoding='utf-8')
print('Generated public/Max-Rodriguez-Resume.pdf and public/resume.html')
