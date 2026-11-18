#!/bin/zsh
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
PLIST_SRC="$REPO/scripts/client-engine/com.zoeyzb.linkedin-client-engine-sync.plist"
PLIST_DST="$HOME/Library/LaunchAgents/com.zoeyzb.linkedin-client-engine-sync.plist"
mkdir -p "$HOME/Library/LaunchAgents" "$REPO/state"
cp "$PLIST_SRC" "$PLIST_DST"
launchctl bootout "gui/$(id -u)" "$PLIST_DST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"
launchctl kickstart -k "gui/$(id -u)/com.zoeyzb.linkedin-client-engine-sync"
echo "Read-only LinkedIn sync agent installed: $PLIST_DST"
