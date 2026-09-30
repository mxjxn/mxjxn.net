# mxjxn.net

Personal link directory with a terminal-inspired design and Keystatic editing.

## Local editing

Requires Node.js 22.12 or newer. Run `npm ci`, then `npm run dev -- --host 127.0.0.1 --port 4331`.

- Homepage: http://127.0.0.1:4331/
- Editor: http://127.0.0.1:4331/keystatic

Open **Profile & links**. Add or remove links, drag to reorder, or turn off **Show this link** to hide one without deleting it. Each link has a title, destination, optional subtitle, and new-tab setting. Save to update local content. The first nine visible links receive matching keyboard shortcuts; all links remain clickable. Shortcuts can be disabled on the homepage.

Content lives in `src/content/directory.json`; the editor schema lives in `keystatic.config.ts`. No database is needed. Local saves are files, not a production deployment.

## Production migration

The old version was served directly by Caddy from `/var/www/mxjxn.net`. This version requires a build and a Node service for GitHub-authenticated Keystatic. **Do not deploy by pulling and leaving the old Caddy file-server configuration in place.**

1. Set up a Keystatic GitHub App for `mxjxn/mxjxn.net`. For local setup, set `KEYSTATIC_GITHUB_MODE=true` in `.env`, restart the dev server, and visit `/keystatic`. Use `https://mxjxn.net` as the production URL. The GitHub App needs the callback `https://mxjxn.net/api/keystatic/github/oauth/callback`. Grant access to this repository only. See https://keystatic.com/docs/github-mode.
2. Store the four generated environment variables from `.env.example` in `/etc/mxjxn-net.env` on the server. Do not commit credentials. The public app slug must be present during the build as well as at runtime. Keep the env file readable only by the deployment administrator/service as appropriate.
3. Install dependencies with `npm ci`; load the production environment and run `npm run build`.
4. Configure a service using `deploy/mxjxn-net.service` as a template. Adjust the Node executable, service user, and directory to match the server. Keep it bound to loopback.
5. Change only the `mxjxn.net` Caddy block to `reverse_proxy 127.0.0.1:4331` and reload Caddy after validation. Keep the previous release available for rollback.
6. Verify the homepage and a full `/keystatic` login/save cycle.

GitHub-mode saves commit to the selected repository branch. To publish those changes, the server must pull that branch, run `npm ci && npm run build`, and restart the service. An existing deployment agent such as Suchbot can do this. This repo does not create a public deployment webhook or configure an automatic deployment trigger.

The homepage is prerendered at build time; only the editor/API require a Node runtime. A failed build must not replace a working release.

## Checks

`npm test` checks link filtering and URL safety. `npm run build` validates the Astro and Keystatic bundle. The rotating SVG has a pause control and honors reduced-motion preferences. No animation is needed to read or use the links.
