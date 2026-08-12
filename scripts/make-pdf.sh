#!/usr/bin/env bash
# Regenerate public/cv.pdf from the /cv/ route.
#
# The PDF is a build artifact of src/pages/cv.astro + src/styles/cv.css — never
# edit it by hand, and re-run this after any change to src/data/cv.ts.
#
#   bash scripts/make-pdf.sh
#
# Requires a Chromium-family browser (chromium, google-chrome, brave, msedge).
# Page size and margins come from @page in cv.css, so the browser is only asked
# to print without its own header/footer.

set -euo pipefail

cd "$(dirname "$0")/.."

PORT=4329
URL="http://localhost:${PORT}/cv/"
OUT="public/cv.pdf"

BROWSER=""
for candidate in chromium chromium-browser google-chrome google-chrome-stable brave microsoft-edge microsoft-edge-stable; do
	if command -v "$candidate" >/dev/null 2>&1; then
		BROWSER="$candidate"
		break
	fi
done

if [ -z "$BROWSER" ]; then
	echo "No Chromium-family browser found (tried chromium, google-chrome, brave, msedge)." >&2
	exit 1
fi

echo "→ Building site"
npm run build

echo "→ Serving dist/ on port ${PORT}"
npm run preview -- --port "$PORT" >/tmp/cv-preview.log 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

# Wait for the preview server to answer before printing.
for _ in $(seq 1 40); do
	if curl -sfo /dev/null "$URL"; then break; fi
	sleep 0.25
done

echo "→ Printing ${URL} with ${BROWSER}"
PROFILE="$(mktemp -d)"
"$BROWSER" \
	--headless=new \
	--disable-gpu \
	--user-data-dir="$PROFILE" \
	--no-pdf-header-footer \
	--virtual-time-budget=5000 \
	--print-to-pdf="$OUT" \
	"$URL"
rm -rf "$PROFILE"

echo "→ Wrote ${OUT}"
if command -v pdfinfo >/dev/null 2>&1; then
	pdfinfo "$OUT" | grep -E '^(Pages|Page size|File size)'
	echo "   (expected: 1 page, 595 x 842 pts / A4)"
fi
