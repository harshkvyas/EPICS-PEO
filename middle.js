// The 18 scenarios and eight engineering areas come from the Grades 6–8 question bank.
const pathways = {
  C: ['Civil engineering', 'Design bridges, roads, buildings, water systems, and safer communities.', 'Sketch a safer, more accessible route through your school.'],
  M: ['Mechanical engineering', 'Design machines, moving parts, sports equipment, vehicles, and robots.', 'Build a paper mechanism and test what makes it move more reliably.'],
  E: ['Electrical engineering', 'Work with circuits, sensors, power, electronics, and communication devices.', 'Build a simple low-voltage circuit or map the sensors in a familiar device.'],
  S: ['Computer and software engineering', 'Create apps, games, code, and systems that process information.', 'Sketch an app screen that helps solve a problem at school.'],
  Env: ['Environmental engineering', 'Protect water, air, land, ecosystems, and community health.', 'Look for one way your school could reduce waste.'],
  B: ['Biomedical engineering', 'Design technology that helps people stay healthy or recover from injury.', 'Sketch a more comfortable tool for someone who needs help with a daily task.'],
  Ch: ['Chemical and materials engineering', 'Create useful substances and improve materials such as batteries, fabrics, and medicines.', 'Compare two materials for strength, stretch, or water resistance.'],
  A: ['Aerospace engineering', 'Design aircraft, spacecraft, satellites, drones, and exploration technology.', 'Change one feature of a paper airplane and test its flight.']
};

const questions = [
  ['If you could fix or improve one thing at your school, what would it be?', [['A cracked sidewalk or unsafe stairwell', 'C'], ['A recycling bin system that actually gets used', 'Env'], ['A vending machine or locker that keeps jamming', 'M'], ['An app to help students find their classrooms or buses', 'S']]],
  ['Which class project would you be most excited to build?', [['A tower or bridge out of spaghetti or popsicle sticks', 'C'], ['A little car or catapult that actually moves', 'M'], ['A blinking light or simple alarm circuit', 'E'], ['A short animation or mini-game on the computer', 'S']]],
  ['Your backpack strap keeps snapping. What part of the problem interests you most?', [['Why the shape of the strap makes it rip', 'M'], ['Whether a different fabric would stretch less', 'Ch'], ['A tiny sensor that beeps before it breaks', 'E'], ['Redesigning the whole bag to feel better on your back', 'B']]],
  ['Which kind of puzzle is most fun for you?', [['Taking apart a toy to see how the gears move', 'M'], ['Following clues in order to crack a code', 'S'], ['Untangling a mess of wires or lights', 'E'], ['Figuring out the best route on a map', 'C']]],
  ['Your neighborhood keeps flooding after big storms. What would you want to work on?', [['Designing better drains, sidewalks, or a small bridge', 'C'], ['Testing whether the flood water is safe or dirty', 'Env'], ['Building a sensor that warns when water is rising', 'E'], ['Using a chart of past storms to guess where it will flood next', 'S']]],
  ['Which invention would make you the most proud to have helped build?', [['A robot arm that helps sort recycling', 'M'], ['A wearable that reminds someone to take medicine', 'B'], ['A better, safer battery for phones', 'Ch'], ['A tiny satellite that takes pictures of Earth', 'A']]],
  ['Your gaming controller or remote stops working. What do you check first?', [['Whether a wire or the battery is loose', 'E'], ['Whether the game or app itself has a glitch', 'S'], ['Whether a button or gear inside is stuck', 'M'], ['Whether the plastic case is cracked or worn out', 'Ch']]],
  ['Your school wants to build a new outdoor hangout space. What part excites you most?', [['Planning where the paths, benches, and ramps go', 'C'], ['Picking plants that do not need much watering', 'Env'], ['Adding solar-powered lights', 'E'], ['Designing a touchscreen kiosk with school information', 'S']]],
  ['Which everyday question would you most want to figure out the answer to?', [['How do buildings stay standing in an earthquake?', 'C'], ['How can we get plastic out of the ocean?', 'Env'], ['How does a smartwatch count your heartbeat?', 'B'], ['How does a plane stay in the air with something so heavy?', 'A']]],
  ['In a group project, which job would you pick?', [['Sketch the design and decide how it should look', 'C'], ['Build the model and make sure it actually moves', 'M'], ['Write the steps or organize the group’s data', 'S'], ['Check how the finished design affects people or nature', 'Env']]],
  ['If you had a box of random craft and hardware supplies, what would you build?', [['A little car, ramp, or launcher', 'M'], ['A circuit that lights up or makes noise', 'E'], ['A model rocket or glider', 'A'], ['Something stretchy, waterproof, or color-changing', 'Ch']]],
  ['Which result would feel most satisfying to see?', [['A tower holding way more weight than you expected', 'C'], ['Your code running exactly the way you planned', 'S'], ['A device that actually helps someone move or feel better', 'B'], ['A park or stream looking cleaner than before', 'Env']]],
  ['Your school’s sports teams ask for help. Which problem would you pick?', [['Design a safer helmet or knee pad', 'B'], ['Find a better material for the soles of running shoes', 'Ch'], ['Build a camera setup that tracks how fast players run', 'E'], ['Build an app that tracks team stats', 'S']]],
  ['Which tool would you most want to learn to use?', [['A 3D printer or a basic building kit', 'M'], ['A block-based coding app or simple game maker', 'S'], ['A circuit kit with wires, batteries, and small lights', 'E'], ['A model-building or map-drawing tool', 'C']]],
  ['Which topic would you pick to learn more about?', [['How engines, machines, and motion work', 'M'], ['How electricity, magnets, and signals work', 'E'], ['How the human body and medical tools work', 'B'], ['How weather, water, and ecosystems work', 'Env']]],
  ['A delivery needs to reach a place with no roads. What solution sounds most fun to work on?', [['Designing a path or small bridge to get there', 'C'], ['Building a drone to fly it in', 'A'], ['Programming the drone’s flight path', 'S'], ['Designing lightweight packaging so nothing breaks', 'Ch']]],
  ['Pick a challenge for a school invention fair.', [['Make a classroom use less electricity', 'E'], ['Make your cafeteria produce less trash', 'Env'], ['Make a chore or task at home easier with a machine', 'M'], ['Make a medical tool less scary or more comfortable for kids', 'B']]],
  ['Fast forward ten years: which project would you be most excited to work on?', [['Designing a new stadium, bridge, or water park', 'C'], ['Building a robot or an electric go-kart', 'M'], ['Creating an app or video game that makes people’s lives easier', 'S'], ['Designing something that flies: a plane, drone, spacecraft, or flying car', 'A']]]
];

const root = document.querySelector('#explorer');
const answers = Array(questions.length).fill(null);
let step = 0;

function focusHeading() {
  root.querySelector('h1')?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function showIntro() {
  root.innerHTML = `<section class="explorer-shell">
    <span class="explorer-intro-mark" aria-hidden="true">🤖</span>
    <p class="eyebrow">Grades 6–8 · Engineering Explorer</p>
    <h1 tabindex="-1">What would you like to solve?</h1>
    <p class="explorer-lead">Pick the task you would most enjoy in each of 18 everyday scenarios. At the end, discover three engineering areas you may like exploring and a simple activity to try for each one.</p>
    <button class="button button-primary explorer-next" id="begin">Start exploring <span aria-hidden="true">→</span></button>
    <aside class="explorer-note"><span aria-hidden="true">★</span><p><strong>Follow your curiosity.</strong>There are no right answers, and you do not need to know how to build any of these things yet.</p></aside>
  </section>`;
  root.querySelector('#begin').addEventListener('click', () => { step = 0; showQuestion(); });
}

function selectAnswer(index) {
  answers[step] = index;
  root.querySelectorAll('[data-answer]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.answer) === index)));
  root.querySelector('#next').disabled = false;
}

function advanceQuestion() {
  if (answers[step] === null) return;
  if (step === questions.length - 1) showResults();
  else { step++; showQuestion(); }
}

function showQuestion() {
  const [question, options] = questions[step];
  root.innerHTML = `<section class="explorer-shell">
    <div class="explorer-meta"><span>Grades 6–8 · Engineering Explorer</span><span>Question ${step + 1} of ${questions.length}</span></div>
    <div class="explorer-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${step + 1}"><span style="width:${((step + 1) / questions.length) * 100}%"></span></div>
    <p class="eyebrow">Choose what interests you most</p>
    <h1 class="explorer-question" tabindex="-1">${question}</h1>
    <div class="explorer-answers" role="group" aria-label="Answer choices">
      ${options.map(([label], index) => `<button class="explorer-answer" type="button" data-answer="${index}" aria-pressed="${answers[step] === index}"><span class="explorer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${label}</span></button>`).join('')}
    </div>
    <div class="explorer-actions"><button class="explorer-back" type="button" id="back">← ${step === 0 ? 'Introduction' : 'Previous question'}</button><button class="button button-primary explorer-next" type="button" id="next" ${answers[step] === null ? 'disabled' : ''}>${step === questions.length - 1 ? 'See my areas' : 'Next question'} <span aria-hidden="true">→</span></button></div>
    <p class="explorer-keyboard-hint">Tip: press Enter after choosing an answer to continue.</p>
  </section>`;
  root.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => selectAnswer(Number(button.dataset.answer))));
  root.querySelector('#back').addEventListener('click', () => { if (step === 0) showIntro(); else { step--; showQuestion(); } });
  root.querySelector('#next').addEventListener('click', advanceQuestion);
  focusHeading();
}

root.addEventListener('keydown', event => {
  if (event.key !== 'Enter' || !root.querySelector('#next')) return;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const answer = target.closest('[data-answer]');
  if (answer) {
    event.preventDefault();
    selectAnswer(Number(answer.dataset.answer));
    advanceQuestion();
  } else if (!target.closest('button, a') && answers[step] !== null) {
    event.preventDefault();
    advanceQuestion();
  }
});

function showResults() {
  const available = Object.fromEntries(Object.keys(pathways).map(code => [code, 0]));
  const selected = Object.fromEntries(Object.keys(pathways).map(code => [code, 0]));
  questions.forEach(([, options], index) => {
    options.forEach(([, code]) => available[code]++);
    selected[options[answers[index]][1]]++;
  });
  // Each area appears a different number of times in the source bank. Compare
  // selections against its opportunities so frequently listed areas do not win by default.
  const top = Object.keys(pathways).filter(code => selected[code] > 0)
    .sort((a, b) => selected[b] / available[b] - selected[a] / available[a] || selected[b] - selected[a] || Object.keys(pathways).indexOf(a) - Object.keys(pathways).indexOf(b))
    .slice(0, 3);
  root.innerHTML = `<section class="explorer-shell">
    <p class="eyebrow">Your exploration starter</p>
    <h1 tabindex="-1">Here are three areas to explore.</h1>
    <p class="explorer-result-intro">Your choices show what interests you today. Engineers often work across several areas, so treat these as ideas to try, not permanent labels.</p>
    <ol class="explorer-results">${top.map((code, index) => `<li class="explorer-result"><span class="explorer-rank" aria-label="Area ${index + 1}">${index + 1}</span><div><h2>${pathways[code][0]}</h2><p>${pathways[code][1]}</p><p class="mission"><strong>Try this:</strong> ${pathways[code][2]}</p></div></li>`).join('')}</ol>
    <p class="explorer-fine-print">This is an interest explorer, not a test of your skills or a career recommendation. Try another activity to see what else you enjoy.</p>
    <button class="button button-primary explorer-next" type="button" id="restart">Explore again <span aria-hidden="true">↻</span></button>
  </section>`;
  root.querySelector('#restart').addEventListener('click', () => { answers.fill(null); showIntro(); focusHeading(); });
  focusHeading();
}

showIntro();
