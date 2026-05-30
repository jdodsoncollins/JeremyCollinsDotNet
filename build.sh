#!/bin/bash
set -e

# If Vercel tries to build from /site, redirect to root
if [ ! -d "site" ]; then
  ln -s . site || true
fi

# Run the actual build
pnpm run build
