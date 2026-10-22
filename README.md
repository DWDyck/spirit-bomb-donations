# Lend Me Your Tokens

A parody "spirit bomb" donation site. Static files only: no build step, no backend.

## Edit
- `config.js` holds the wallet, energy total, goal and heroes.
- Preview any sphere stage with `index.html?energy=72` (percent of goal).
- After changing the wallet, regenerate the QR: `npx qrcode -t svg -o qr.svg "<address>"`
- Never put private keys or seed phrases anywhere in this repo.

## Hosting on GitHub Pages
Settings, Pages, deploy from branch `main`, folder `/ (root)`. All paths are relative, so it works under `https://<user>.github.io/spirit-bomb-donations/`. `.nojekyll` skips the Jekyll build.

Unofficial fan parody. Not affiliated with or endorsed by any anime franchise.
