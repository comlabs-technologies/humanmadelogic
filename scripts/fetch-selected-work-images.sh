#!/usr/bin/env bash
# Downloads the Selected Work photography into the repository so the site
# serves it locally instead of hotlinking the WordPress origin.
#
#   ./scripts/fetch-selected-work-images.sh
#
# Re-run after changing any source URL below. Commit the downloaded files.
set -euo pipefail

DEST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/images/hml/selected-work"
BASE="https://humanmadelogic.fun/wp-content/uploads/2025/03"

mkdir -p "$DEST"

fetch() {
  local remote="$1" local_name="$2"
  echo "→ ${local_name}.webp"
  curl -fsSL --retry 3 "${BASE}/${remote}" -o "${DEST}/${local_name}.webp"
}

fetch "Professional-Studio-Photoshoot-of-a-Luxury-SUV.webp" "photography-luxury-suv-studio"
fetch "Post-Production-Studio-Monochrome-Photograph.webp"   "video-production-post-studio"
fetch "Noir-Aviary-Boutique.webp"                           "design-branding-noir-aviary"
fetch "Eco-friendly-Product-Packaging-Concept.webp"         "ecommerce-eco-packaging"

echo
echo "Done. Four files in public/images/hml/selected-work/ — commit them."
