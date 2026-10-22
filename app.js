(function () {
  "use strict";
  var C = window.CONFIG;
  var $ = function (id) { return document.getElementById(id); };

  // --- State: one number. Everything else is derived from it. ---
  var percent = Math.min(100, Math.max(0, (C.energy / C.goal) * 100));
  var preview = parseFloat(new URLSearchParams(location.search).get("energy")); // ?energy=72 to preview
  if (isFinite(preview)) percent = Math.min(100, Math.max(0, preview));
  var energy = Math.round((percent / 100) * C.goal);

  // Highest entry whose "from" has been reached.
  function currentIndex(list) {
    var idx = 0;
    list.forEach(function (item, i) { if (percent >= item.from) idx = i; });
    return idx;
  }

  // Build elements safely: text only, never innerHTML.
  function el(tag, text, cls) {
    var e = document.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  }

  var fmt = function (n) { return n.toLocaleString("en-US"); };

  // --- Hero + meter ---
  var stage = currentIndex(C.milestones) + 1;
  $("hero").dataset.stage = String(stage);

  var level = C.powerLevels[currentIndex(C.powerLevels)];
  $("power-name").textContent = level.name;
  $("collected").textContent = fmt(energy);
  $("goal").textContent = fmt(C.goal);
  document.querySelectorAll(".unit").forEach(function (u) { u.textContent = C.unit; });
  $("over").hidden = energy <= 9000;
  $("percent").textContent = String(Math.floor(percent));
  $("fill").style.transform = "scaleX(" + percent / 100 + ")";
  $("bar").setAttribute("aria-valuenow", String(Math.floor(percent)));
  $("bar").setAttribute("aria-label", "Energy collected");

  var upcoming = C.milestones[stage];
  $("next").textContent = upcoming
    ? "Next unlock at " + fmt(Math.ceil(C.goal * upcoming.from / 100)) + " " + C.unit + ": " + upcoming.title
    : "Maximum energy reached. Please stand back.";

  // --- Donation ---
  var wallet = String(C.wallet);
  var looksValid = /^(0x[0-9a-fA-F]{40}|[1-9A-HJ-NP-Za-km-z]{32,44}|bc1[0-9a-z]{25,62})$/.test(wallet);
  $("address").textContent = wallet;
  $("wallet-warn").hidden = looksValid;
  $("networks").textContent = C.networks.join(", ");

  $("copy").addEventListener("click", function () {
    var done = function (msg) { $("copied").textContent = msg; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(wallet).then(
        function () { done("Copied. Power level rising."); },
                function () { done("Copy failed. Select the address manually and believe in yourself."); }
      );
    } else {
      var range = document.createRange();
      range.selectNodeContents($("address"));
      var sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      done("Address selected. Press Ctrl+C.");
    }
  });

  // --- Hall of Heroes ---
  var heroes = $("heroes-list");
  if (!C.heroes.length) {
    heroes.appendChild(el("li", "No heroes yet. The throne of Refactor Ranger is vacant.", "card"));
  }
  C.heroes.forEach(function (h) {
    var li = el("li", null, "card");
    var who = h.alias || h.name || "Anonymous Warrior";
    li.appendChild(el("strong", who));
    if (h.alias && h.name) li.appendChild(el("span", "(" + h.name + ")", "muted"));
    if (h.title) li.appendChild(el("span", h.title, "title"));
    if (h.amount) li.appendChild(el("span", fmt(h.amount) + " " + C.unit, "muted"));
    heroes.appendChild(li);
  });

  // --- Milestones ---
  C.milestones.forEach(function (m, i) {
    var unlocked = i < stage;
    var li = el("li", null, unlocked ? "unlocked" : "locked");
    li.appendChild(el("strong", "Level " + (i + 1) + ": " + (unlocked ? m.title : "???")));
    li.appendChild(el("span", unlocked ? m.note : "Unlocks at " + m.from + "% energy. Scream louder.", "muted"));
    $("milestone-list").appendChild(li);
  });
})();
