// One engine renders every mission from the PDF-derived data in missions-data.js.
const root = document.querySelector('#quest');
const notebookDialog = document.querySelector('#notebook-dialog');
const storageKey = 'epics-k5-adventures-v3';
const gradeLabels = { k1: 'K–1', g23: 'Grades 2–3', g45: 'Grades 4–5' };
const sceneLabels = { civil: 'Build a strong bridge', mechanical: 'Spin and stop', electrical: 'Light up the night', software: 'Guide the mail robot', environmental: 'Help the creek', biomedical: 'Design a brush', materials: 'Stay dry, move free', aerospace: 'Fly to the garden' };
const labControls = {
  civil: [['brace', 'Add triangle braces', '△'], ['cart', 'Roll a cart', '▣'], ['drain', 'Guide the rain', '≈']],
  mechanical: [['gears', 'Turn the gears', '⚙'], ['curtain', 'Lift the curtain', '↑'], ['brake', 'Try the brake', '◉']],
  electrical: [['gate', 'Gate light', '◉'], ['path', 'Path light', '◉'], ['story', 'Story light', '◉']],
  software: [['forward', 'Move', '↑'], ['left', 'Turn left', '↶'], ['right', 'Turn right', '↷'], ['deliver', 'Deliver', '◇']],
  environmental: [['garden', 'Rain garden', '✿'], ['plants', 'Plant the bank', '♧'], ['recycle', 'Recycling spot', '♻']],
  biomedical: [['grip', 'Widen the grip', '⊞'], ['sleeve', 'Slide the sleeve', '↔'], ['dots', 'Paint some dots', '••']],
  materials: [['seams', 'Seal the seams', '╱'], ['elbows', 'Flex the elbows', '⌁'], ['rain', 'Run a rain test', '☂']],
  aerospace: [['left', 'Aim left', '↖'], ['right', 'Aim right', '↗'], ['launch', 'Launch capsule', '➤']]
};
const toggleActions = { civil: ['brace', 'drain'], mechanical: ['gears', 'curtain', 'brake'], electrical: ['gate', 'path', 'story'], environmental: ['garden', 'plants', 'recycle'], biomedical: ['sleeve'], materials: ['seams', 'elbows'] };
const iconPaths = {
  civil: '<path d="M7 47h50M13 43l10-20 9 20 9-20 10 20M8 31h48M16 47V32m32 15V32"/>',
  mechanical: '<circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="7"/><path d="M32 5v9m0 36v9M5 32h9m36 0h9M13 13l7 7m24 24 7 7M51 13l-7 7M20 44l-7 7"/>',
  electrical: '<path d="M8 24h10v16H8zM18 32h10m17 0h11M28 32l7-13-2 11h12l-16 17 4-15"/>',
  software: '<rect x="8" y="8" width="48" height="48" rx="9"/><path d="M20 8v48M44 8v48M8 20h48M8 44h48M17 47l14-14 12 7 7-17"/><circle cx="17" cy="47" r="3" fill="currentColor" stroke="none"/><circle cx="50" cy="23" r="3" fill="currentColor" stroke="none"/>',
  environmental: '<path d="M7 45c9-5 15-5 25 0s16 5 25 0M7 53c9-5 15-5 25 0s16 5 25 0M32 41V11m0 22C14 32 13 19 20 13c5 0 12 5 12 20Zm0-6c17 0 21-12 14-18-7 1-14 8-14 18Z"/>',
  biomedical: '<path d="M15 48 42 15c3-4 9-2 9 2 0 2-1 3-2 5L22 54l-9 2 2-8ZM24 39l9 8M36 25l9 8M12 19h11m-6-6v12"/>',
  materials: '<path d="M10 18 32 8l22 10-22 10-22-10Zm0 13 22 10 22-10M10 44l22 10 22-10M10 18v26m44-26v26M32 28v26"/>',
  aerospace: '<path d="m7 43 22-9 10-24 5 2-4 24 17 10-2 5-20-5-10 10-4-2 6-14-19 8-1-5Z"/>'
};
function missionMark(id, extra = '') { return `<svg class='mission-mark ${extra}' viewBox='0 0 64 64' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'>${iconPaths[id]}</svg>`; }
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let stored = {};
try { stored = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) { stored = {}; }
const state = {
  grade: gradeLabels[stored.grade] ? stored.grade : 'g23',
  notebook: Array.isArray(stored.notebook) ? stored.notebook : [],
  mission: null, step: 0, selected: null, explanation: '', result: null, attempts: [],
  lab: {}, labNote: 'Tap a tool and watch what changes in the scene.', labTouched: false, labWin: false
};
let animationFrame = 0;

function save() {
  // Save every test, including ideas that need revision, immediately after the result appears.
  try { localStorage.setItem(storageKey, JSON.stringify({ grade: state.grade, notebook: state.notebook })); } catch (_) { /* Storage may be unavailable. */ }
}
function safe(value) { return String(value ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }
function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
function speak(message) {
  if (!('speechSynthesis' in window)) return;
  stopSpeech();
  const words = new SpeechSynthesisUtterance(message);
  words.rate = 0.88;
  speechSynthesis.speak(words);
}
function topbar() {
  return `<div class='adventure-topbar'>${state.mission ? '<button class=topbar-back data-home><span aria-hidden=true>←</span> Adventure map</button>' : '<span class=topbar-kicker><span class=signal-dot></span> THE ADVENTURE MAP</span>'}<button class='notebook-trigger' data-notebook><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' aria-hidden='true'><path d='M4 5.5C7 4 10 4 12 6v14c-2-2-5-2-8-.5v-14ZM20 5.5c-3-1.5-6-1.5-8 .5v14c2-2 5-2 8-.5v-14Z'/></svg>My Field Notebook <span>${state.notebook.length}</span></button></div>`;
}
function grades() {
  return `<fieldset class='grade-toggle'><legend>Pick your level</legend><div>${Object.entries(gradeLabels).map(([key, label]) => `<button type='button' data-grade='${key}' aria-pressed='${state.grade === key}'>${label}</button>`).join('')}</div></fieldset>`;
}
function bindCommon() {
  root.querySelectorAll('[data-home]').forEach(b => b.addEventListener('click', () => { stopSpeech(); state.mission = null; renderHub(); window.scrollTo(0, 0); }));
  root.querySelectorAll('[data-notebook]').forEach(b => b.addEventListener('click', openNotebook));
  root.querySelectorAll('[data-grade]').forEach(b => b.addEventListener('click', () => { state.grade = b.dataset.grade; state.explanation = ''; save(); render(); }));
}
function renderHub() {
  cancelAnimationFrame(animationFrame);
  root.innerHTML = `<section class='adventure-shell adventure-hub'>${topbar()}
    <div class='hub-hero'><div class='hero-copy'><p class='eyebrow'>EPICS ENGINEERING ADVENTURES</p><h1>Ready, set, invent!</h1><p>Pick a mission, play with the tools, test your idea, and help someone in your community.</p><div class='hero-points'><span><b>08</b> adventures</span><span><b>64</b> fun decisions</span><span><b>∞</b> things to try</span></div></div><div class='hero-system' aria-hidden='true'><div class='hero-orbit hero-orbit-one'></div><div class='hero-orbit hero-orbit-two'></div><div class='hero-core'><small>LET'S BUILD</small><strong>IDEA<br>LAB</strong><span>PLAY · TEST · IMPROVE</span></div><div class='orbit-icon orbit-one'>${missionMark('civil')}</div><div class='orbit-icon orbit-two'>${missionMark('electrical')}</div><div class='orbit-icon orbit-three'>${missionMark('aerospace')}</div></div></div>
    <div class='hub-section-heading'><div><p class='section-index'>CHOOSE YOUR NEXT CHALLENGE</p><h2>Pick an adventure</h2><p>Every mission has someone to help and something new to discover.</p></div>${grades()}</div>
    <div class='adventure-grid'>${EPICS_MISSIONS.map((m, i) => `<button class='adventure-card' data-mission='${m.id}' style='--card-hue:${18 + i * 35}'><span class='card-top'><span class='adventure-card-icon'>${missionMark(m.id)}</span><span class='card-number'>${String(i + 1).padStart(2, '0')} / 08</span></span><small>${safe(m.field)}</small><strong>${safe(m.title)}</strong><span class='card-summary'>${safe(m.summary)}</span><span class='card-link'>Enter mission <span aria-hidden='true'>↗</span></span></button>`).join('')}</div>
    <p class='hub-reassurance'><span class='signal-dot'></span> No scores or game overs. Every try teaches you something new!</p></section>`;
  bindCommon();
  root.querySelectorAll('[data-mission]').forEach(b => b.addEventListener('click', () => startMission(b.dataset.mission)));
  if (state.grade === 'k1') speak('Engineering Adventures. Pick a community mission. Listen, build, test, and improve. ' + EPICS_MISSIONS.map(m => `${m.title}. ${m.summary}`).join(' '));
}
function startMission(id) {
  state.mission = EPICS_MISSIONS.find(m => m.id === id);
  state.step = 0; state.selected = null; state.explanation = ''; state.result = null; state.attempts = [];
  state.lab = id === 'software' ? { x: 2, y: 3, dir: 0, delivered: 0 } : id === 'electrical' ? { gate: true, path: true, story: false } : id === 'aerospace' ? { aim: 0, launches: 0 } : {};
  state.labNote = 'Tap a tool and watch your experiment come alive!';
  state.labTouched = false; state.labWin = false;
  renderStep(); window.scrollTo(0, 0);
}
function renderLab() {
  return `<div class='lab-panel'><div class='lab-intro'><span>YOUR PLAY LAB</span><strong>Tap to make things happen!</strong><p data-lab-note role='status'>${safe(state.labNote)}</p></div><div class='lab-controls'>${labControls[state.mission.id].map(([id, label, symbol]) => `<button type='button' data-lab-action='${id}' ${toggleActions[state.mission.id]?.includes(id) ? `aria-pressed='${Boolean(state.lab[id])}'` : ''}><span aria-hidden='true'>${symbol}</span>${label}</button>`).join('')}</div></div>`;
}
function updateStageStatus() {
  const status = root.querySelector('.stage-status');
  if (!status) return;
  status.classList.toggle('status-ready', Boolean(state.result?.correct || (!state.result && state.labWin)));
  status.classList.toggle('status-clue', Boolean(state.result && !state.result.correct));
  status.querySelector('strong').textContent = state.result ? (state.result.correct ? 'Your idea is ready!' : 'You found a new clue') : state.labWin ? 'Mission goal complete!' : state.labTouched ? 'Your experiment is in motion!' : 'Tap a tool below to play';
}
function handleLabAction(action) {
  const l = state.lab, id = state.mission.id;
  if (id === 'civil') {
    if (action === 'brace') { l.brace = !l.brace; state.labNote = l.brace ? 'Triangle braces help the deck stay steady.' : 'Without braces, the frame has less support.'; }
    if (action === 'cart') { l.cart = (l.cart || 0) + 1; l.actionAt = performance.now(); state.labNote = l.brace ? 'The cart rolls across your supported bridge!' : 'Watch the cart. What might make this bridge stronger?'; }
    if (action === 'drain') { l.drain = !l.drain; state.labNote = l.drain ? 'Rainwater now flows away from the ramp.' : 'Water gathers near the ramp again.'; }
  } else if (id === 'mechanical') {
    if (action === 'gears') { l.gears = !l.gears; state.labNote = l.gears ? 'Turn the first gear. Watch the others turn in different directions.' : 'The gears slow to a stop.'; }
    if (action === 'curtain') { l.curtain = !l.curtain; state.labNote = l.curtain ? 'Pulling down raises the curtain!' : 'The curtain lowers again.'; }
    if (action === 'brake') { l.brake = !l.brake; state.labNote = l.brake ? 'The lever stops the prize wheel while the other gears can turn.' : 'The prize wheel can turn again.'; }
  } else if (id === 'electrical') {
    l[action] = !l[action]; state.labNote = `${action[0].toUpperCase() + action.slice(1)} light ${l[action] ? 'on' : 'off'}. Each area has its own switch.`;
  } else if (id === 'software') {
    if (action === 'left') { l.dir = (l.dir + 3) % 4; state.labNote = 'Robot turns left without moving.'; }
    if (action === 'right') { l.dir = (l.dir + 1) % 4; state.labNote = 'Robot turns right without moving.'; }
    if (action === 'forward') { const d = [[0,-1],[1,0],[0,1],[-1,0]][l.dir], x = l.x + d[0], y = l.y + d[1]; if (x < 0 || x > 4 || y < 0 || y > 4) state.labNote = 'That would leave the map. Try another direction.'; else { l.x = x; l.y = y; state.labNote = 'Robot moved one sidewalk block.'; } }
    if (action === 'deliver') {
      const atBlue = l.x === 1 && l.y === 2, atRed = l.x === 3 && l.y === 2;
      if (!atBlue && !atRed) state.labNote = 'Find a house before delivering the package.';
      else if (l.delivered === 0 && atBlue) { l.delivered = 1; state.labNote = 'Blue package delivered! Now guide the robot to Red House.'; }
      else if (l.delivered === 1 && atRed) { l.delivered = 2; state.labNote = 'Hooray! Blue, then red—both neighbors got the right package!'; }
      else if (l.delivered === 2) state.labNote = 'Both deliveries are complete. Great route planning!';
      else state.labNote = l.delivered ? 'Blue House has its package. Head to Red House next.' : 'The blue package goes to Blue House first.';
    }
  } else if (id === 'environmental') {
    l[action] = !l[action]; state.labNote = { garden: l.garden ? 'The rain garden slows water before it reaches the path.' : 'The path may flood again without a rain garden.', plants: l.plants ? 'Roots help hold the creek bank in place.' : 'Bare soil can wash toward the creek.', recycle: l.recycle ? 'Neighbors have a place for wrappers near the bridge.' : 'Wrappers can still blow toward the creek.' }[action];
  } else if (id === 'biomedical') {
    if (action === 'grip') { l.grip = ((l.grip || 0) + 1) % 4; state.labNote = l.grip ? 'The handle is wider. Would that feel comfortable to the artist?' : 'Back to the original thin handle.'; }
    if (action === 'sleeve') { l.sleeve = !l.sleeve; state.labNote = l.sleeve ? 'The sleeve moves back so the brush tip is easier to see.' : 'The sleeve sits close to the tip again.'; }
    if (action === 'dots') { l.dots = Math.min((l.dots || 0) + 1, 8); state.labNote = 'Try painting tiny dots. Can the artist see the tip?'; }
  } else if (id === 'materials') {
    if (action === 'seams') { l.seams = !l.seams; state.labNote = l.seams ? 'The seams are sealed to keep rain out.' : 'Open seams can let water through.'; }
    if (action === 'elbows') { l.elbows = !l.elbows; state.labNote = l.elbows ? 'Flexible elbows let Maya lift her camera.' : 'Stiff elbows make it harder to reach.'; }
    if (action === 'rain') { l.rain = (l.rain || 0) + 1; state.labNote = l.seams ? 'Drops roll off the jacket in the rain test.' : 'The rain test reveals gaps at the seams.'; }
  } else if (id === 'aerospace') {
    if (action === 'left') { l.aim = Math.max(-2, l.aim - 1); l.launches = 0; state.labNote = 'Aim a little farther left into the wind.'; }
    if (action === 'right') { l.aim = Math.min(2, l.aim + 1); l.launches = 0; state.labNote = 'Aim right. Remember the wind also pushes right.'; }
    if (action === 'launch') { l.launches++; l.actionAt = reducedMotion ? -1800 : performance.now(); state.labNote = l.aim === -1 ? 'The wind carries your capsule toward the garden target!' : l.aim < -1 ? 'The capsule lands left of the target. Try a smaller adjustment.' : 'The wind carries the capsule right. Try aiming left.'; }
  }
  state.labTouched = true;
  state.labWin = (id === 'software' && l.delivered === 2) || (id === 'aerospace' && l.launches > 0 && l.aim === -1);
  root.querySelector('[data-lab-note]').textContent = state.labNote;
  updateStageStatus();
  root.querySelectorAll('[data-lab-action][aria-pressed]').forEach(button => button.setAttribute('aria-pressed', String(Boolean(l[button.dataset.labAction]))));
  if (reducedMotion) animateStage();
  if (state.grade === 'k1') speak(state.labNote);
}
function stepSpeech() {
  const s = state.mission.steps[state.step];
  return `${state.mission.title}. Community need: ${state.mission.need} Step ${state.step + 1}. ${s.title}. ${s.question} ` + s.choices.map(c => `${c.label}. ${c.text}`).join(' ');
}
function comparison() {
  const recent = state.attempts.slice(-2);
  return `<div class='compare-card'><strong>Test comparison</strong>${recent.length ? `<div class='compare-grid'>${recent.map((entry, i) => `<div><small>${recent.length === 2 && i === 0 ? 'Past test' : 'Current test'} · Choice ${entry.choice}</small><p>${safe(entry.outcome)}</p></div>`).join('')}</div>` : '<p>Your test results will appear here so you can compare ideas.</p>'}</div>`;
}
function resultPanel() {
  const r = state.result;
  return `<div class='test-result ${r.correct ? 'result-ready' : 'result-explore'}' role='status'><span class='result-symbol' aria-hidden='true'>${r.correct ? '✓' : '↗'}</span><div><strong>${r.correct ? 'Great discovery!' : 'Look what happened!'}</strong><p>${safe(r.choice.outcome)}</p><small>Saved in your Field Notebook · ${r.correct ? 'Ready for the next part' : 'Pick a new idea and try again'}</small></div></div>`;
}
function renderStep() {
  const m = state.mission, s = m.steps[state.step], complete = state.result?.correct;
  root.innerHTML = `<section class='adventure-shell mission-engine ${state.grade === 'k1' ? 'grade-k1' : ''}'>${topbar()}
    <div class='mission-meta'><div class='mission-identity'><div class='identity-mark'>${missionMark(m.id)}</div><div><small>${safe(m.field)}</small><strong>${safe(m.title)}</strong></div></div><div class='step-count'><small>MISSION PROGRESS</small><strong>${String(state.step + 1).padStart(2, '0')} <span>/ 08</span></strong></div></div>
    <div class='step-track' aria-label='Mission progress'>${m.steps.map((_, i) => `<span class='${i < state.step ? 'passed' : i === state.step ? 'current' : ''}'></span>`).join('')}</div>
    <div class='mission-controls'>${grades()}<span class='progress-copy'>CURRENT PHASE <b>${safe(s.title)}</b></span></div>
    <div class='mission-layout'><div class='stage-column'><div class='visual-stage'><canvas id='mission-canvas' width='640' height='390' role='img' aria-label='Interactive ${safe(m.title)} scene'></canvas><div class='stage-header'><div><small>PLAY & EXPERIMENT / ${safe(m.field)}</small><strong>${sceneLabels[m.id]}</strong></div><span class='stage-number'>${String(state.step + 1).padStart(2, '0')}</span></div><div class='stage-status ${state.result ? (complete ? 'status-ready' : 'status-clue') : ''}'><span class='status-pulse' aria-hidden='true'></span><div><small>YOUR EXPERIMENT</small><strong>${state.result ? (complete ? 'Your idea is ready!' : 'You found a new clue') : 'Tap a tool below to play'}</strong></div></div></div>${renderLab()}<div class='need-card'><span>WHO NEEDS YOUR HELP?</span><p>${safe(m.need)}</p></div>${state.grade === 'g45' ? comparison() : ''}</div>
    <div class='choice-panel'><div class='question-head'><span class='eyebrow'>${safe(s.title)} / YOUR CHALLENGE</span><button class='read-button' data-read>◖)) Listen</button></div><h1>${safe(s.question)}</h1><p class='choice-hint'>Pick an idea, then tap the test button. You can always try again!</p><div class='choice-list'>${s.choices.map((c, i) => `<button class='choice-button ${state.selected === i ? 'selected' : ''}' data-choice='${i}' aria-pressed='${state.selected === i}' ${complete ? 'disabled' : ''}><span class='choice-letter'>${c.label}</span><span>${safe(c.text)}</span><span class='choice-indicator' aria-hidden='true'></span></button>`).join('')}</div>${state.grade === 'g45' && !complete ? `<label class='explanation-label' for='reason'>Why might this idea work?</label><textarea id='reason' rows='3' placeholder='Tell us what you think…'>${safe(state.explanation)}</textarea>` : ''}${!complete ? `<button class='test-button' data-test ${state.selected === null ? 'disabled' : ''}><span>Test my idea!</span><span aria-hidden='true'>✦</span></button>` : ''}${state.result ? resultPanel() : ''}${complete ? `<button class='continue-button' data-continue><span>${state.step === 7 ? 'Finish mission' : 'Next part of the adventure'}</span><span aria-hidden='true'>→</span></button>` : ''}</div></div></section>`;
  bindCommon();
  updateStageStatus();
  root.querySelectorAll('[data-choice]').forEach(b => b.addEventListener('click', () => { const nextChoice = Number(b.dataset.choice); if (state.selected !== nextChoice) state.explanation = ''; state.selected = nextChoice; state.result = null; renderStep(); }));
  root.querySelector('#reason')?.addEventListener('input', e => { state.explanation = e.target.value; });
  root.querySelector('[data-test]')?.addEventListener('click', testChoice);
  root.querySelector('[data-continue]')?.addEventListener('click', nextStep);
  root.querySelector('[data-read]').addEventListener('click', () => speak(stepSpeech()));
  root.querySelectorAll('[data-lab-action]').forEach(b => b.addEventListener('click', () => handleLabAction(b.dataset.labAction)));
  animateStage();
  if (state.grade === 'k1') speak(state.result ? state.result.choice.outcome + (complete ? ' Continue when you are ready.' : ' Try another idea.') : stepSpeech());
}
function testChoice() {
  if (state.selected === null) return;
  const reason = root.querySelector('#reason');
  if (state.grade === 'g45') {
    state.explanation = reason.value.trim();
    if (!state.explanation) { reason.setCustomValidity('Tell us why you chose this idea before testing.'); reason.reportValidity(); reason.addEventListener('input', () => reason.setCustomValidity(''), { once: true }); return; }
  }
  const m = state.mission, s = m.steps[state.step], choice = s.choices[state.selected];
  const correct = choice.label === s.continueWith;
  const entry = { mission: m.title, missionId: m.id, step: state.step + 1, title: s.title, choice: choice.label, choiceText: choice.text, outcome: choice.outcome, explanation: state.explanation, correct, date: new Date().toISOString() };
  state.notebook.push(entry); state.attempts.push(entry); state.result = { choice, correct };
  save(); renderStep();
  root.querySelector('.test-result')?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
}
function nextStep() {
  if (!state.result?.correct) return;
  stopSpeech();
  if (state.step === 7) { renderFinish(); return; }
  state.step++; state.selected = null; state.explanation = ''; state.result = null; state.attempts = [];
  renderStep(); window.scrollTo(0, 0);
}
function renderFinish() {
  cancelAnimationFrame(animationFrame);
  const m = state.mission;
  root.innerHTML = `<section class='adventure-shell adventure-finish'>${topbar()}<div class='finish-medallion'>${missionMark(m.id)}</div><p class='eyebrow'>MISSION COMPLETE / ${safe(m.field)}</p><h1>You did it, engineer!</h1><p>You listened, built, tested, and improved in <strong>${safe(m.title)}</strong>. Every idea you tried is in your Field Notebook.</p><div class='field-note-prompt'><strong>YOUR FIELD NOTE</strong><p>${safe(m.fieldNote)}</p></div><div class='finish-links'><button class='continue-button' data-home>Choose another mission <span aria-hidden='true'>→</span></button><button class='read-button' data-notebook>Open Field Notebook</button></div></section>`;
  bindCommon();
  window.scrollTo(0, 0);
  if (state.grade === 'k1') speak(`Mission complete. You helped your community in ${m.title}. ${m.fieldNote}`);
}
function openNotebook() {
  stopSpeech();
  const entries = state.notebook.slice().reverse();
  notebookDialog.innerHTML = `<div class='notebook-head'><div><p class='eyebrow'>Every idea has a story</p><h2 id='notebook-title'>Field Notebook</h2></div><button class='notebook-close' data-close aria-label='Close notebook'>×</button></div><p class='notebook-intro'>Your tests are saved on this device. Ideas that needed revision still taught you something.</p><div class='notebook-entries'>${entries.length ? entries.map(e => `<article class='notebook-entry'><small>${safe(e.mission)} · Step ${e.step}: ${safe(e.title)}</small><strong>We tried ${safe(e.choiceText)}</strong>${e.explanation ? `<p><em>Our reason:</em> ${safe(e.explanation)}</p>` : ''}<p><em>We noticed:</em> ${safe(e.outcome)}</p></article>`).join('') : '<p class=empty-notebook>No tests yet. Pick a mission and try an idea.</p>'}</div>`;
  notebookDialog.querySelector('[data-close]').addEventListener('click', () => notebookDialog.close());
  notebookDialog.showModal();
  if (state.grade === 'k1') speak('Field Notebook. ' + (entries.length ? entries.map(e => `We tried ${e.choiceText}. We noticed ${e.outcome}.`).join(' ') : 'No tests yet. Pick a mission and try an idea.'));
}
notebookDialog.addEventListener('click', e => { if (e.target === notebookDialog) notebookDialog.close(); });
notebookDialog.addEventListener('close', stopSpeech);

function animateStage() {
  cancelAnimationFrame(animationFrame);
  const ctx = root.querySelector('#mission-canvas').getContext('2d');
  const id = state.mission.id, step = state.step, outcome = state.result ? (state.result.correct ? 'ready' : 'revise') : 'waiting';
  const resultText = state.result?.choice.outcome || '';
  const draw = t => { drawScene(ctx, id, step, outcome, resultText, reducedMotion ? 0 : t / 1000, state.lab); if (!reducedMotion) animationFrame = requestAnimationFrame(draw); };
  animationFrame = requestAnimationFrame(draw);
}
function render() { state.mission ? renderStep() : renderHub(); }
render();
