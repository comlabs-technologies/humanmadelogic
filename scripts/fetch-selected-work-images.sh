#!/usr/bin/env bash
# Pulls the Selected Work photography into the repository so production does
# not depend on the WordPress origin staying up.
#
#   ./scripts/fetch-selected-work-images.sh
#
# Then flip WORK_UPLOADS in src/config/media.ts to the local path (one line,
# documented there) and commit both the files and that change.
set -euo pipefail

DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/images/hml/selected-work"
BASE="https://humanmadelogic.fun/wp-content/uploads/2025/03"

mkdir -p "$DEST"

fetch() {
  echo "→ $2.webp"
  curl -fsSL --retry 3 "$BASE/$1.webp" -o "$DEST/$2.webp"
}

fetch "Professional-Studio-Photoshoot-of-a-Luxury-SUV" "Professional-Studio-Photoshoot-of-a-Luxury-SUV"
fetch "Post-Production-Studio-Monochrome-Photograph"   "Post-Production-Studio-Monochrome-Photograph"
fetch "Noir-Aviary-Boutique"                           "Noir-Aviary-Boutique"
fetch "Eco-friendly-Product-Packaging-Concept"         "Eco-friendly-Product-Packaging-Concept"

echo
echo "Done. Now set WORK_UPLOADS in src/config/media.ts to:"
echo "  const WORK_UPLOADS = '/images/hml/selected-work';"
