# Lend Me Your Tokens

Static site. Open `index.html` directly or host the folder anywhere.

- Edit `config.js` for wallet, energy total, goal, heroes and missions.
- Preview any sphere stage with `index.html?energy=72` (percent of goal).
- After changing the wallet, regenerate the QR: `npx qrcode -t svg -o qr.svg "<address>"`
- Never put private keys or seed phrases anywhere in this folder.
