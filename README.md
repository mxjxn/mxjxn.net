# mxjxn.net

Terminal-style link directory. Astro 7 SSR + Keystatic CMS (GitHub storage mode).

**Live:** https://mxjxn.net · **Edit:** https://mxjxn.net/keystatic (GitHub auth)

## Architecture

- Source + deploy directory: `/var/www/mxjxn.net` on the mxjxn.com server (this repo checked out there)
- Runtime: systemd unit `mxjxn-net` (see `deploy/mxjxn-net.service`) — dedicated `mxjxn-net` user, `127.0.0.1:4331`, NoNewPrivileges/PrivateTmp
- Env: `/etc/mxjxn-net.env` (root:root 600) — Keystatic secret + GitHub App creds (same app as www.mxjxn.com)
- Caddy proxies `mxjxn.net` → localhost:4331
- Content: `src/content/directory.json` (Keystatic singleton: name, description, location, links)
- Keystatic storage: GitHub mode → edits in the admin UI create branches on this repo; merge to `main` to deploy
- Auto-deploy: GitHub push webhook → `https://www.mxjxn.com/webhook` (shared with www site) → pull + install + build + `systemctl restart mxjxn-net`

## Manual deploy (fallback)

```
cd /var/www/mxjxn.net && git pull origin main && npm install --no-audit --no-fund && npm run build && systemctl restart mxjxn-net
```

## Keystatic auth

GitHub OAuth via the `mxjxn-com-keystatic` GitHub App (shared with www.mxjxn.com). Its callback URL list must include `https://mxjxn.net/api/keystatic/github/oauth/callback`.
