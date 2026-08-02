#!/usr/bin/env bash
# Regenerate the minified assets the site actually loads.
#
# style.css and main.js are the sources of truth; style.min.css and main.min.js
# are build output and must never be hand-edited. A past hand-edit shipped
# "animation-duration:NaNs" into the prefers-reduced-motion block, which silently
# disabled the reduced-motion guarantee for everyone who relies on it.
#
# Usage: scripts/build_assets.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ESBUILD="npx --yes esbuild@0.24.0"

echo "==> style.css -> style.min.css"
$ESBUILD style.css --minify --outfile=style.min.css --allow-overwrite

echo "==> main.js -> main.min.js"
$ESBUILD main.js --minify --target=es2015 --outfile=main.min.js --allow-overwrite

echo "==> a11y.js -> a11y.min.js"
$ESBUILD a11y.js --minify --target=es2015 --outfile=a11y.min.js --allow-overwrite

echo "==> verifying"
for f in main.js a11y.js; do node --check "$f"; done
for f in main.min.js a11y.min.js; do
  node -e "new Function(require('fs').readFileSync('$f','utf8'))" && echo "    $f parses"
done

# A minifier must never invent NaN, undefined or null into a declaration value.
if grep -qE ':(NaN|undefined|null)[a-z%]*[;}]' style.min.css; then
  echo "    FAIL: invalid computed value in style.min.css" >&2
  exit 1
fi

# Brace balance is a cheap smoke test that the CSS survived intact.
python3 - <<'PY'
import sys
src = open('style.min.css', encoding='utf-8').read()
if src.count('{') != src.count('}'):
    sys.exit(f"FAIL: unbalanced braces in style.min.css ({src.count('{')} vs {src.count('}')})")
print(f"    style.min.css: {src.count('{')} blocks, {len(src)} bytes")
PY

echo "==> done. Remember to bump the ?v= query on both files in every HTML page."
