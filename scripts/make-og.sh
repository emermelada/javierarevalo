#!/usr/bin/env bash
# Regenerate public/og.jpg, the Open Graph link preview, from the /og-card/ route.
#
# Like the PDF, the image is a build artifact of a page in this repo. Never
# edit it by hand; re-run this after changing profile data in src/data/cv.ts or
# the card itself in src/pages/og-card.astro.
#
#   bash scripts/make-og.sh
#
# Requires a Chromium-family browser, same as scripts/make-pdf.sh. The card is
# captured at exactly 1200x630, the size LinkedIn, Slack and X all crop to.

set -euo pipefail

cd "$(dirname "$0")/.."

PORT=4330
URL="http://localhost:${PORT}/og-card/"
SHOT="public/og.png"
OUT="public/og.jpg"

BROWSER=""
for candidate in chromium chromium-browser google-chrome google-chrome-stable chrome brave microsoft-edge microsoft-edge-stable msedge; do
	if command -v "$candidate" >/dev/null 2>&1; then
		BROWSER="$candidate"
		break
	fi
done

# Windows installs Chrome/Edge outside PATH, so probe the standard locations too.
if [ -z "$BROWSER" ]; then
	PF="${PROGRAMFILES:-/c/Program Files}"
	PFX86="${PROGRAMFILES_X86:-/c/Program Files (x86)}"
	LAD="${LOCALAPPDATA:-$HOME/AppData/Local}"
	for candidate in "$PF/Google/Chrome/Application/chrome.exe" "$LAD/Google/Chrome/Application/chrome.exe" "$PFX86/Google/Chrome/Application/chrome.exe" "$PFX86/Microsoft/Edge/Application/msedge.exe" "$PF/Microsoft/Edge/Application/msedge.exe"; do
		if [ -x "$candidate" ]; then
			BROWSER="$candidate"
			break
		fi
	done
fi

if [ -z "$BROWSER" ]; then
	echo "No Chromium-family browser found (tried chromium, google-chrome, brave, msedge)." >&2
	exit 1
fi

echo "→ Building site"
npm run build

echo "→ Serving dist/ on port ${PORT}"
npm run preview -- --port "$PORT" >"${TMPDIR:-/tmp}/og-preview.log" 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

# Wait for the preview server to answer before capturing.
for _ in $(seq 1 40); do
	if curl -sfo /dev/null "$URL"; then break; fi
	sleep 0.25
done

echo "→ Capturing ${URL} with ${BROWSER}"
PROFILE="$(mktemp -d)"
# A Windows browser launched from Git Bash needs native paths for its file args.
if command -v cygpath >/dev/null 2>&1; then
	SHOT_ARG="$(cygpath -w "$(cd "$(dirname "$SHOT")" && pwd)/$(basename "$SHOT")")"
	PROFILE_ARG="$(cygpath -w "$PROFILE")"
else
	SHOT_ARG="$SHOT"
	PROFILE_ARG="$PROFILE"
fi

"$BROWSER" \
	--headless=new \
	--disable-gpu \
	--hide-scrollbars \
	--force-device-scale-factor=1 \
	--user-data-dir="$PROFILE_ARG" \
	--window-size=1200,630 \
	--virtual-time-budget=5000 \
	--screenshot="$SHOT_ARG" \
	"$URL"
rm -rf "$PROFILE"

# JPEG rather than PNG: same card at roughly a fifth of the bytes, and every
# platform that reads Open Graph accepts it. The PNG is only an intermediate.
echo "→ Encoding ${OUT}"
python -c "
from PIL import Image
im = Image.open('${SHOT}').convert('RGB')
assert im.size == (1200, 630), 'unexpected capture size: %s' % (im.size,)
im.save('${OUT}', quality=88, optimize=True, progressive=True)
print('   %dx%d, %d bytes' % (im.width, im.height, __import__('os').path.getsize('${OUT}')))
"
rm -f "$SHOT"

echo "→ Wrote ${OUT}"
