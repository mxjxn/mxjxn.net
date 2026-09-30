# mxjxn.net

Terminal-style static landing page. Three files, no build step.

**Live:** https://mxjxn.net
**Served by:** Caddy directly from `/var/www/mxjxn.net` on the mxjxn.com server — this repo *is* the deploy directory. Edit, commit, push; changes are live immediately (no rebuild).

```
mxjxn.net {
    root * /var/www/mxjxn.net
    file_server
}
```
