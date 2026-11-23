"""Read-only private evidence review. Run with .venv/Scripts/python.exe."""
from pathlib import Path
from pypdf import PdfReader
root = Path(__file__).resolve().parents[2]
files = list((root / 'source-material').glob('*.pdf')) + list((root / 'source-material/cirtifications').glob('*.pdf'))
report = []
for file in files:
    report.append(f'FILE: {file.name}\n')
    report.extend(page.extract_text() for page in PdfReader(file).pages)
(root / 'website/qa/private-document-review.txt').write_text('\n'.join(report), encoding='utf-8')
print(f'Reviewed {len(files)} private PDFs; extraction saved only to ignored qa/.')
