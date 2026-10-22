// The only file you need to edit for routine updates.
// Plain data, no logic. Loaded before app.js.
window.CONFIG = {
  unit: "tokens",
  energy: 3200,   // total collected (update by hand)
  goal: 10000,    // energy needed for "Spirit Bomb Ready"

  // PUBLIC receiving address only. Never put keys or seed phrases here.
  // After changing it, regenerate qr.svg:  npx qrcode -t svg -o qr.svg "<address>"
  wallet: "REPLACE_WITH_YOUR_PUBLIC_WALLET_ADDRESS",
  networks: ["Ethereum", "Base", "Arbitrum", "Polygon"],

  // Lowest percent of goal at which each power level begins.
  powerLevels: [
    { name: "Barely Conscious", from: 0 },
    { name: "Mildly Productive", from: 20 },
    { name: "Feature Frenzy", from: 45 },
    { name: "Vibe Maximum", from: 70 },
    { name: "Reality Distortion Event", from: 95 },
  ],

  // Sphere stages. "from" is percent of goal.
  milestones: [
    { from: 0, title: "Small glowing orb", note: "Technically a nightlight." },
    { from: 15, title: "Electric arcs", note: "Sparks of questionable intent." },
    { from: 35, title: "Storm clouds", note: "The weather is now my problem." },
    { from: 55, title: "Planet visible in background", note: "Someone's home is in the blast radius. Sorry, Kevin." },
    { from: 80, title: "Cosmic emergency warning", note: "Authorities have been notified. They shrugged." },
    { from: 100, title: "Spirit Bomb Ready", note: "Aimed squarely at the backlog. The backlog is not worried." },
  ],

  // name and alias are optional. Anonymous heroes are still heroes.
  heroes: [
    { name: "Ada", alias: "", title: "Refactor Ranger", amount: 500 },
    { name: "", alias: "NullPointerNinja", title: "Bug Slayer", amount: 300 },
    { name: "Grace", alias: "Merge Monk", title: "Wizard of Merge Conflicts", amount: 250 },
    { name: "", alias: "", title: "Keeper of Technical Debt", amount: 100 },
  ],
};
