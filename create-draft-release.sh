#!/bin/bash

# Ensure GitHub CLI is authenticated
if ! gh auth status &> /dev/null; then
  echo "GitHub CLI is not authenticated. Run 'gh auth login' first."
  exit 1
fi

# Check if tag is provided
if [[ -z "$1" ]]; then
  echo "Usage: $0 <tag> [asset]"
  exit 1
fi

TAG=$1
ASSET=$2
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Create the release
echo "Creating GitHub release for tag: $TAG"
gh release create "$TAG" --repo "$REPO" --draft --title "DAP $TAG" --notes-file "release-notes.md"

# Upload asset if provided
if [[ -n "$ASSET" ]]; then
  if [[ -f "$ASSET" ]]; then
    echo "Uploading asset: $ASSET"
    gh release upload "$TAG" "$ASSET" --repo "$REPO"
  else
    echo "Asset file not found: $ASSET"
    exit 1
  fi
fi

echo "Release $TAG created successfully."
