#!/bin/bash
set -e

CSV="finstar_slugs.csv"

mkdir -p content/sites
mkdir -p data/sites

# пропускаем заголовок
tail -n +2 "$CSV" | while IFS=',' read -r record_id slug template; do
  slug=$(echo "$slug" | tr -d '\r' | xargs)
  template=$(echo "$template" | tr -d '\r' | xargs)

  [ -z "$slug" ] && continue
  [ -z "$template" ] && template="template_1"

  mkdir -p "content/sites/$slug"

  cat > "content/sites/$slug/index.md" <<EOF
---
title: "$slug"
slug: "$slug"
type: "sites"
template: "$template"
---
EOF

  cat > "data/sites/$slug.json" <<EOF
{
  "slug": "$slug",
  "template": "$template"
}
EOF

  echo "✅ $slug -> $template"
done