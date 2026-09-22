const lab = document.querySelector('#quest');

const loads = {
  1: { name: 'Seedling backpack', short: 'Backpack', icon: '🎒', need: 1 },
  2: { name: 'Garden supply cart', short: 'Supply cart', icon: '🛒', need: 1 },
  3: { name: 'Community delivery van', short: 'Delivery van', icon: '🚐', need: 2 }
};

let braces = [[false, false], [false, false], [false, false]];
let loadLevel = 2;
let result = null;
let phase = 'build';

function braceCount(bay) {
  return braces[bay].filter(Boolean).length;
}

function firstWeakBay() {
  return braces.findIndex((_, bay) => braceCount(bay) < loads[loadLevel].need);
}

function testBridge() {
  const weakBay = firstWeakBay();
  result = weakBay === -1 ? { pass: true } : { pass: false, weakBay };
  phase = result.pass ? 'reflect' : 'improve';
  renderBridge();
}

function resetBridge() {
  braces = [[false, false], [false, false], [false, false]];
  loadLevel = 2;
  result = null;
  phase = 'build';
  renderBridge();
}

function renderTruss() {
  return braces.map((bay, bayIndex) => `
    <div class="truss-bay ${result?.weakBay === bayIndex ? 'weak' : ''}" aria-label="Bridge bay ${bayIndex + 1}">
      <span class="bay-number">${bayIndex + 1}</span>
      ${bay.map((on, braceIndex) => `
        <button class="brace brace-${braceIndex} ${on ? 'on' : ''}" data-bay="${bayIndex}" data-brace="${braceIndex}" aria-pressed="${on}" aria-label="${on ? 'Remove' : 'Add'} ${braceIndex ? 'backward' : 'forward'} diagonal in bay ${bayIndex + 1}"><span>${on ? '✓' : '+'}</span></button>
      `).join('')}
      <small>${braceCount(bayIndex) === 0 ? 'square' : braceCount(bayIndex) === 1 ? 'triangles' : 'reinforced'}</small>
    </div>
  `).join('');
}

function statusMessage() {
  if (!result) return 'Add diagonal beams to all 3 bays, then run a test.';
  if (result.pass) return `${loads[loadLevel].name} made it across safely!`;
  return `Bay ${result.weakBay + 1} swayed. Add ${loads[loadLevel].need === 2 ? 'another diagonal' : 'a diagonal'} there and test again.`;
}

function renderReflection() {
  const used = braces.flat().filter(Boolean).length;
  return `
    <section class="reflection-panel" aria-labelledby="reflection-title">
      <div class="mission-complete">Mission complete <span aria-hidden="true">★</span></div>
      <div class="reflection-visual" aria-hidden="true"><span>👧🏽</span><b>━━━</b><span>${loads[loadLevel].icon}</span><b>━━━</b><span>🌱</span></div>
      <p class="eyebrow">You helped the school garden</p>
      <h1 id="reflection-title">You thought like an engineer.</h1>
      <p>You built an idea, tested it with a real load, and improved weak spots. That is engineering—not just getting an answer right.</p>
      <div class="strength-grid">
        <div><span>🔎</span><strong>Noticer</strong><small>You found the weak bay.</small></div>
        <div><span>🧠</span><strong>Problem-solver</strong><small>You used triangles on purpose.</small></div>
        <div><span>🔁</span><strong>Improver</strong><small>You learned from the test.</small></div>
      </div>
      <div class="reflect-question">
        <strong>If the bridge had to hold an even heavier truck, what would you change?</strong>
        <button data-reflect="reinforce">Add more support</button>
        <button data-reflect="material">Try a stronger material</button>
        <button data-reflect="both">Test both ideas</button>
        <p id="reflection-feedback" aria-live="polite"></p>
      </div>
      <div class="finish-actions"><button class="button button-primary" id="build-again">Build another bridge</button><a href="index.html">Explore another age track</a></div>
      <small class="simulation-note">Your design used ${used} digital beams. This is a simplified learning model, not a real structural safety test.</small>
    </section>
  `;
}

function renderBridge() {
  if (phase === 'reflect') {
    lab.innerHTML = renderReflection();
    lab.querySelector('#build-again').addEventListener('click', resetBridge);
    lab.querySelectorAll('[data-reflect]').forEach(button => button.addEventListener('click', () => {
      lab.querySelectorAll('[data-reflect]').forEach(choice => choice.classList.toggle('selected', choice === button));
      const messages = {
        reinforce: 'Good idea. Engineers often add support where forces are greatest.',
        material: 'Good idea. Material choice changes how much force a bridge can handle.',
        both: 'Excellent engineering move: change one thing at a time, test, and compare the evidence.'
      };
      lab.querySelector('#reflection-feedback').textContent = messages[button.dataset.reflect];
    }));
    return;
  }

  const placed = braces.flat().filter(Boolean).length;
  const load = loads[loadLevel];
  lab.innerHTML = `
    <section class="bridge-lab">
      <header class="mission-header">
        <div class="mission-copy"><p class="eyebrow">Grade 5 · Community engineering mission</p><h1>Bridge the garden creek.</h1><p>Maya needs to carry seedlings to the school garden, but yesterday's rain washed out the path. Build a bridge that gets her supplies across safely.</p></div>
        <div class="client-card"><span aria-hidden="true">👧🏽</span><div><small>Your client</small><strong>Maya</strong><p>“The garden club needs these plants today!”</p></div></div>
      </header>
      <nav class="mission-steps" aria-label="Engineering design steps"><span class="done"><b>1</b> Meet</span><i></i><span class="done"><b>2</b> Build</span><i></i><span class="${phase === 'improve' ? 'done' : 'active'}"><b>3</b> Test</span><i></i><span class="${phase === 'improve' ? 'active' : ''}"><b>4</b> Improve</span></nav>
      <div class="bridge-world ${result && !result.pass ? 'failed' : ''}">
        <div class="world-sky"><span class="cloud cloud-one"></span><span class="cloud cloud-two"></span></div>
        <div class="garden-bank"><span>🌻</span><span>🥕</span><strong>SCHOOL<br>GARDEN</strong></div><div class="maya" aria-hidden="true">👧🏽<small>Maya</small></div><div class="creek" aria-hidden="true"><span>〰 〰 〰 〰 〰</span></div>
        <div class="bridge-structure"><div class="bridge-deck"></div><div class="truss-frame">${renderTruss()}</div><div class="bridge-piers"><i></i><i></i></div></div>
        <div class="test-load ${result ? 'driving' : ''} ${result && !result.pass ? `stopped bay-${result.weakBay}` : ''}" aria-label="${load.name}"><span>${load.icon}</span><small>${load.short}</small></div>
        <div class="world-status ${result ? (result.pass ? 'pass' : 'fail') : ''}" aria-live="polite"><span>${result ? (result.pass ? '✓' : '!') : '💡'}</span>${statusMessage()}</div>
      </div>
      <section class="workbench">
        <div class="build-guide"><p class="eyebrow">Your workbench</p><h2>Turn squares into triangles.</h2><p>A square can lean sideways. A diagonal beam splits it into triangles that keep their shape.</p><div class="beam-count"><span><b>${placed}</b>/6 beams placed</span><button id="reset-bridge">Start over</button></div></div>
        <div class="test-controls"><label for="load-range"><span>Choose what must cross</span><strong>${load.icon} ${load.name}</strong></label><input id="load-range" type="range" min="1" max="3" step="1" value="${loadLevel}" aria-valuetext="${load.name}"><div class="load-labels"><span>Backpack</span><span>Cart</span><span>Van</span></div><p class="load-rule">${loadLevel === 3 ? 'Heavy load: cross-brace every bay with 2 diagonals.' : 'This load needs at least 1 diagonal in every bay.'}</p><button class="button button-primary test-button" id="test-bridge">${phase === 'improve' ? 'Test improved bridge' : 'Run bridge test'} <span>→</span></button></div>
      </section>
      <aside class="learning-strip"><span>Why this works</span><p>Triangles hold their shape. Engineers use trusses to guide forces through connected beams and toward the supports.</p><button id="triangle-demo" aria-expanded="false">Show me</button><div id="triangle-explainer" hidden><b>△</b> Push on a square and its corners can shift. Add a diagonal and you make triangles, whose fixed sides resist that sideways motion.</div></aside>
    </section>
  `;

  lab.querySelectorAll('[data-brace]').forEach(button => button.addEventListener('click', () => {
    braces[Number(button.dataset.bay)][Number(button.dataset.brace)] = !braces[Number(button.dataset.bay)][Number(button.dataset.brace)];
    result = null; phase = 'build'; renderBridge();
  }));
  lab.querySelector('#load-range').addEventListener('input', event => { loadLevel = Number(event.target.value); result = null; phase = 'build'; renderBridge(); });
  lab.querySelector('#test-bridge').addEventListener('click', testBridge);
  lab.querySelector('#reset-bridge').addEventListener('click', resetBridge);
  lab.querySelector('#triangle-demo').addEventListener('click', event => {
    const explainer = lab.querySelector('#triangle-explainer');
    explainer.hidden = !explainer.hidden;
    event.currentTarget.setAttribute('aria-expanded', String(!explainer.hidden));
    event.currentTarget.textContent = explainer.hidden ? 'Show me' : 'Hide';
  });
}

renderBridge();
