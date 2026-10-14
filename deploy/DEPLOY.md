# Deploying the Innuka website to a Windows Server VPS (IIS)

The site is a static React (CRA) single-page app. Hosting = build it, copy the
`build/` folder to an IIS site root, and let IIS serve it with an SPA fallback
(handled by `public/web.config`, which CRA copies into every build).

Because the GitHub repo is **public**, the VPS can build straight from GitHub —
no files need to be copied from your laptop.

## Fastest path (run on the VPS, inside RDP)

1. Open **PowerShell as Administrator** on the VPS.
2. Fetch and run the setup script:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
   mkdir C:\sites -Force; cd C:\sites
   git clone https://github.com/teamgriwd-del/innuka.git innuka-src   # if git is already installed
   .\innuka-src\deploy\setup-vps.ps1
   ```
   If `git` isn't installed yet, instead copy `setup-vps.ps1` onto the server
   (paste via RDP clipboard) and run it — it installs git/node for you, then clones.

The script installs IIS + URL Rewrite + Node + Git, builds, publishes to
`C:\inetpub\innuka`, creates an IIS site on port 80, and opens the firewall.

**Redeploy later:** after pushing changes to GitHub, just run `setup-vps.ps1`
again — it pulls, rebuilds, and re-publishes.

## Adding a domain

Edit the top of `setup-vps.ps1` and uncomment/set `$HostHeader = 'yourdomain'`,
then point the domain's DNS **A record** at the VPS public IP. For HTTPS, install
a certificate (e.g. win-acme / Let's Encrypt) and add an https binding on 443.

## Notes / security

- No credentials are used by this process. Nothing from `D:\ZESA BYPASS FINDER`
  is needed — do **not** put keys or passwords in this repo (it is public).
- `web.config` sets `index.html` to `no-cache` so users never get a stale app shell.
