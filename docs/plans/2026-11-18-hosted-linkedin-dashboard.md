# Hosted LinkedIn Dashboard + Browser Sync Implementation Plan

Goal: Move the LinkedIn client engine from localhost-only to a hosted operational cockpit while keeping the existing SQLite engine and Chrome bridge local.

Architecture: SQLite remains canonical. A read-only browser sync agent uses the existing Chrome Default profile and bridge to collect LinkedIn Messaging, Service Page requests, and search candidates. It publishes a compact JSON read model to Supabase through protected Vercel Functions. The hosted dashboard reads that model and queues only manual record changes; it never sends LinkedIn actions.

Global constraints:
- LinkedIn-only.
- Existing Chrome Default profile and existing browser bridge only.
- No automatic DMs, connections, follows, likes, comments, proposals, or other sending.
- User manually reviews/copies/sends.
- Service Requests visibly distinguish Premium/Matched from Direct.
- Hosted dashboard shows ONLINE/OFFLINE connector status and last sync.
- Local SQLite remains canonical; cloud stores only the compact read model.
- Preserve existing upstream skills and keep the repo lightweight.

Task 1: cloud read model and API.
Files: supabase/migrations/20261118_linkedin_dashboard.sql, api/state.js, api/sync.js, api/actions.js, scripts/client-engine/cloud-state.js, tests/client-engine/cloud-state.test.js.
Implement snapshot building, connector freshness, protected sync, and record-only action validation. Test all six dashboard surfaces and reject send/connect/follow actions.

Task 2: read-only LinkedIn browser sync and search discovery.
Files: scripts/client-engine/browser-sync.js, tests/client-engine/browser-sync.test.js, scripts/client-engine/cli.js, scripts/client-engine/searches.js.
Parse Messaging snippets, Service Requests, and LinkedIn People/Posts search results. Use only inactive managed LinkedIn tabs. Put discovery candidates into research/needs-review rather than auto-qualifying them.

Task 3: hosted operational cockpit.
Files: public/linkedin-client-engine.html, scripts/client-engine/cloud-state.js, README.md, docs/CAPABILITY-INVENTORY.md, tests/client-engine/http.test.js.
Add Online/Offline status, prospect queue, Opportunity Inbox, Service Requests, Replies, Follow-ups, Meetings, Drafts, Reports, Open LinkedIn links, and Copy controls. Keep manual record actions explicit.

Task 4: deployment and local sync agent.
Files: vercel.json, api/index.js, scripts/client-engine/install-sync-agent.sh, scripts/client-engine/com.zoeyzb.linkedin-client-engine-sync.plist, scripts/package.json, .gitignore, README.md, tests/client-engine/deployment.test.js.
Deploy from GitHub main, configure Supabase and sync-token environment variables, enable Vercel Authentication for all deployments, and run read-only sync every five minutes through a macOS LaunchAgent. Verify full tests and the production deployment.
