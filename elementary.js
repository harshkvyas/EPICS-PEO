const root = document.querySelector('#quest');
let mission = null;
let built = [];
let rover = { x: 0, y: 3 };

const games = [
  ['bridge', '🌉', 'peach', 'Bridge Builder Lab', 'Turn squares into strong triangles, then test your bridge.'],
  ['water', '💧', 'aqua', 'Water Filter Lab', 'Layer a tiny filter to catch muddy bits from creek water.'],
  ['solar', '☀️', 'gold', 'Solar Circuit Sprint', 'Connect a sunny power path and light the garden sign.'],
  ['rover', '🤖', 'lilac', 'Rover Route Rescue', 'Guide a rover around obstacles to deliver a seed packet.']
];

function controls(label) {
  return '<div class="mini-topbar"><button class="mini-back" data-home>← All missions</button><span>' + label + '</span><button class="mini-reset" data-reset aria-label="Restart mission">↺</button></div>';
}

function home() {
  mission = null;
  root.innerHTML = '<section class="mission-hub"><p class="eyebrow">K–5 engineering mini missions</p><h1>Pick a problem. Try an idea.</h1><p class="hub-copy">Every mission starts with someone who needs help. Build, test, and improve your idea—just like engineers do.</p><div class="mission-grid">' + games.map(function (game) {
    const card = '<span class="mission-icon">' + game[1] + '</span><strong>' + game[3] + '</strong><p>' + game[4] + '</p><b>Start mission →</b>';
    return game[0] === 'bridge' ? '<a class="mission-card ' + game[2] + '" href="bridge.html">' + card + '</a>' : '<button class="mission-card ' + game[2] + '" data-game="' + game[0] + '">' + card + '</button>';
  }).join('') + '</div><aside class="mission-note"><span>★</span><div><strong>There is no one “right” engineering answer.</strong><p>Try something, notice what happens, and make your next version better.</p></div></aside></section>';
  root.querySelectorAll('[data-game]').forEach(function (button) { button.addEventListener('click', function () { start(button.dataset.game); }); });
}

function start(id) {
  mission = id;
  built = [];
  rover = { x: 0, y: 3 };
  render();
}

function bindBasics(reset) {
  root.querySelector('[data-home]').addEventListener('click', home);
  root.querySelector('[data-reset]').addEventListener('click', function () { built = []; rover = { x: 0, y: 3 }; reset(); });
}

function renderWater(note) {
  const parts = [['gravel', '🪨', 'Gravel'], ['sand', '🏖️', 'Sand'], ['charcoal', '⚫', 'Charcoal'], ['cloth', '🧺', 'Cloth']];
  const tube = built.length ? built.map(function (id) { const part = parts.find(function (item) { return item[0] === id; }); return '<span class="filter-layer ' + id + '">' + part[1] + '</span>'; }).join('') : '<span class="filter-empty">Build here</span>';
  root.innerHTML = '<section class="mini-shell water-mission">' + controls('Water Filter Lab') + '<div class="mini-intro"><p class="eyebrow">Notice · build · test</p><h1>Help the creek team see clearer water.</h1><p>Muddy water has tiny pieces of dirt. Stack layers that can catch different-sized bits.</p></div><div class="mini-board"><div class="filter-scene"><div class="mud-cup">🌧️<small>Muddy creek water</small></div><div class="filter-tube">' + tube + '</div><div class="clear-cup">💧<small>See what changes</small></div></div><p class="mini-status">' + (note || 'Choose a layer to build your tiny filter.') + '</p><div class="part-row">' + parts.map(function (part) { const used = built.includes(part[0]); return '<button class="part ' + (used ? 'used' : '') + '" data-part="' + part[0] + '" ' + (used ? 'disabled' : '') + '><span>' + part[1] + '</span>' + part[2] + '</button>'; }).join('') + '</div><button class="button button-primary mini-test" data-test ' + (built.length === 4 ? '' : 'disabled') + '>Test my filter →</button></div><p class="mini-fact">A classroom filter can make water look clearer, but it does not make water safe to drink.</p></section>';
  root.querySelectorAll('[data-part]').forEach(function (button) { button.addEventListener('click', function () { built.push(button.dataset.part); renderWater('Nice layer! What could catch a smaller piece next?'); }); });
  bindBasics(function () { renderWater(); });
  const test = root.querySelector('[data-test]');
  if (!test.disabled) test.addEventListener('click', function () { built.join(',') === 'gravel,sand,charcoal,cloth' ? finish('💧', 'Your filter made the water look clearer!', 'You stacked layers from big spaces to smaller spaces. Engineers test materials and improve a design.') : renderWater('That filter caught some bits. Try gravel, then sand, charcoal, and cloth.'); });
}

function renderSolar(note) {
  const parts = [['panel', '☀️', 'Solar panel'], ['battery', '🔋', 'Battery'], ['switch', '🎚️', 'Switch'], ['lamp', '💡', 'Garden light']];
  const slots = [0, 1, 2, 3].map(function (index) { const id = built[index]; const part = id && parts.find(function (item) { return item[0] === id; }); return '<div class="circuit-slot">' + (part ? '<span>' + part[1] + '</span>' : '+') + '</div>'; }).join('');
  root.innerHTML = '<section class="mini-shell solar-mission">' + controls('Solar Circuit Sprint') + '<div class="mini-intro"><p class="eyebrow">Notice · build · test</p><h1>Light the garden after sunset.</h1><p>The garden club wants a light that stores sunshine during the day.</p></div><div class="mini-board"><div class="circuit-scene"><div class="sun">☀️</div><div class="wire-line ' + (built.length === 4 ? 'live' : '') + '"></div><div class="circuit-slots">' + slots + '</div><div class="garden-lamp ' + (built.length === 4 ? 'lit' : '') + '">💡<small>Garden light</small></div></div><p class="mini-status">' + (note || 'Build a path so sunshine can power the garden light.') + '</p><div class="part-row">' + parts.map(function (part) { const used = built.includes(part[0]); return '<button class="part ' + (used ? 'used' : '') + '" data-part="' + part[0] + '" ' + (used ? 'disabled' : '') + '><span>' + part[1] + '</span>' + part[2] + '</button>'; }).join('') + '</div><button class="button button-primary mini-test" data-test ' + (built.length === 4 ? '' : 'disabled') + '>Flip the switch →</button></div><p class="mini-fact">Real solar systems need safely designed wiring, panels, batteries, and controls.</p></section>';
  root.querySelectorAll('[data-part]').forEach(function (button) { button.addEventListener('click', function () { built.push(button.dataset.part); renderSolar('Connected! Keep tracing the power path.'); }); });
  bindBasics(function () { renderSolar(); });
  const test = root.querySelector('[data-test]');
  if (!test.disabled) test.addEventListener('click', function () { built.join(',') === 'panel,battery,switch,lamp' ? finish('✨', 'The garden light turns on!', 'You connected an energy path: collect sunlight, store energy, control it, and use it.') : renderSolar('Almost! Trace the energy: panel, battery, switch, then garden light.'); });
}

function renderRover(note) {
  const rocks = new Set(['1,2', '2,2', '3,1', '4,2']);
  const cells = Array.from({ length: 20 }, function (_, index) {
    const x = index % 5, y = Math.floor(index / 5), key = x + ',' + y;
    return '<div class="route-cell ' + (rocks.has(key) ? 'rock' : '') + '">' + (x === 4 && y === 0 ? '🌱' : rocks.has(key) ? '🪨' : rover.x === x && rover.y === y ? '🤖' : '') + '</div>';
  }).join('');
  root.innerHTML = '<section class="mini-shell rover-mission">' + controls('Rover Route Rescue') + '<div class="mini-intro"><p class="eyebrow">Notice · plan · test</p><h1>Deliver seeds to the school garden.</h1><p>The rover needs a route around the rocks. Plan ahead, then steer one move at a time.</p></div><div class="mini-board"><div class="route-wrap"><div class="route-grid">' + cells + '</div><div class="route-key"><span>🤖 Rover</span><span>🪨 Rock</span><span>🌱 Delivery spot</span></div></div><p class="mini-status">' + (note || 'Use the arrows to guide the rover to the seed packet.') + '</p><div class="arrow-pad"><button data-move="up">↑</button><button data-move="left">←</button><button data-move="down">↓</button><button data-move="right">→</button></div></div><p class="mini-fact">Robots use sensors, maps, and code to avoid obstacles and choose safe routes.</p></section>';
  root.querySelectorAll('[data-move]').forEach(function (button) { button.addEventListener('click', function () { move(button.dataset.move, rocks); }); });
  bindBasics(function () { renderRover(); });
}

function move(direction, rocks) {
  const changes = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const next = { x: rover.x + changes[direction][0], y: rover.y + changes[direction][1] };
  if (next.x < 0 || next.x > 4 || next.y < 0 || next.y > 3) return renderRover('That edge is outside the map. Try another route.');
  if (rocks.has(next.x + ',' + next.y)) return renderRover('Bump! The rover found a rock. Engineers use obstacles as clues to improve a route.');
  rover = next;
  if (rover.x === 4 && rover.y === 0) return finish('🌱', 'Delivery complete!', 'You planned, tested each move, and changed course when needed. That is how engineers guide real-world systems.');
  renderRover('Nice move. Keep the rover away from the rocks.');
}

function finish(icon, title, detail) {
  root.innerHTML = '<section class="mini-shell mission-finish"><div class="finish-icon">' + icon + '</div><p class="eyebrow">Mission complete</p><h1>' + title + '</h1><p>' + detail + '</p><div class="finish-actions"><button class="button button-primary" data-home>Choose another mission</button><button class="button restart" data-replay>Play this one again</button></div></section>';
  root.querySelector('[data-home]').addEventListener('click', home);
  root.querySelector('[data-replay]').addEventListener('click', function () { start(mission); });
}

function render() {
  if (mission === 'water') return renderWater();
  if (mission === 'solar') return renderSolar();
  return renderRover();
}

home();
