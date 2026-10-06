const lab = document.querySelector('#quest');

const loads = {
  1: { name: 'Seedling backpack', short: 'Backpack', icon: '🎒', needs: [1, 1, 1], budget: 4, span: 1, banks: 'soft', hint: 'A short crossing with soft riverbanks. Find a simple design that can carry the backpack.' },
  2: { name: 'Garden supply cart', short: 'Supply cart', icon: '🛒', needs: [1, 2, 1], budget: 5, span: 2, banks: 'soft', hint: 'The creek is wider here, and the cart presses hardest in the middle.' },
  3: { name: 'Community delivery van', short: 'Delivery van', icon: '🚐', needs: [2, 2, 2], budget: 7, span: 3, banks: 'rocky', hint: 'A long crossing with firm rock on both sides. Find a design for the heavy van.' }
};

const bridgeTypes = {
  beam: { name:'Beam', icon:'━', cost:1, span:1, clue:'Install horizontal timber girders beneath the deck.', lesson:'Load bends the horizontal beam; its end supports carry the reaction forces.', material:'Wooden boards', parts:[
    ['left-girder','Left boards','Supports the left section.', [1,0,0]],
    ['center-girder','Middle boards','Stiffens the otherwise weak middle.', [0,1,0]],
    ['right-girder','Right boards','Supports the right section.', [0,0,1]]
  ] },
  truss: { name:'Truss', icon:'△', cost:2, span:2, clue:'Join steel diagonals into triangles across three bays.', lesson:'Triangular members carry pulling and pushing forces through connected joints.', material:'Steel truss members', parts:[
    ['diagonal-0-0','Left slant up','Triangulates the left bay.',[1,0,0]],['diagonal-0-1','Left slant down','Adds another left-bay load path.',[1,0,0]],
    ['diagonal-1-0','Middle slant up','Strengthens the loaded middle bay.',[0,1,0]],['diagonal-1-1','Middle slant down','Adds another middle-bay load path.',[0,1,0]],
    ['diagonal-2-0','Right slant up','Triangulates the right bay.',[0,0,1]],['diagonal-2-1','Right slant down','Adds another right-bay load path.',[0,0,1]]
  ] },
  arch: { name:'Arch', icon:'⌒', cost:1, span:3, needsRock:true, clue:'Close the stone arch and secure both abutments.', lesson:'The closed arch carries compression outward into its abutments. In this model those supports require firm rock.', material:'Stone sections and abutments', parts:[
    ['left-arch','Left stones','Builds the left half of the compression path.',[0,0,0]],['keystone','Middle stone','Closes the arch so its sections work together.',[0,0,0]],['right-arch','Right stones','Builds the right half of the compression path.',[0,0,0]],
    ['left-abutment','Left stone support','Resists outward thrust at the left end.',[0,0,0]],['right-abutment','Right stone support','Resists outward thrust at the right end.',[0,0,0]]
  ] },
  suspension: { name:'Suspension', icon:'⌢', cost:1, span:3, clue:'Build anchored towers, connect the main cable, then hang the deck.', lesson:'Hangers pull the deck up toward the main cable. The cable transfers load to towers and anchored ends.', material:'Towers, steel cables, and hangers', parts:[
    ['left-tower','Left tower','Supports and anchors one end of the cable.',[0,0,0]],['right-tower','Right tower','Supports and anchors the other end.',[0,0,0]],['main-cable','Main cable','Connects the tower supports in tension.',[0,0,0]],
    ['hanger-0','Left hanging wire','Connects the left deck section to the cable.',[2,0,0]],['hanger-1','Middle hanging wire','Connects the middle deck section to the cable.',[0,2,0]],['hanger-2','Right hanging wire','Connects the right deck section to the cable.',[0,0,2]]
  ] }
};
let assembled = {beam:new Set(),truss:new Set(),arch:new Set(),suspension:new Set()};
let bridgeType = 'beam';
let loadLevel = 1;
let testsRun = 0;
let result = null;
let testing = false;
let showHint = false;
let animationId = 0;
let notice = '';
let lastDrop = '';
const bayNames = ['Left', 'Middle', 'Right'];
const friendlyNames = {beam:'Timber beam',truss:'Triangle truss',arch:'Stone arch',suspension:'Cable bridge'};
const briefLessons = {
  beam:'The extra board supports the middle, where a beam bends most.',
  truss:'The diagonals make triangles. Triangles keep the frame from changing shape.',
  arch:'The curve carries the load into both banks. The end supports keep it from spreading.',
  suspension:'The hangers lift the deck. The main cable carries the load to the towers.'
};
function selectedParts(){return assembled[bridgeType];}
function missingStructure(){
  if(bridgeType==='arch')return bridgeTypes.arch.parts.filter(part=>!selectedParts().has(part[0])).map(part=>part[1]);
  if(bridgeType==='suspension')return bridgeTypes.suspension.parts.slice(0,3).filter(part=>!selectedParts().has(part[0])).map(part=>part[1]);
  return [];
}
function support(bay){
  if(bridgeType==='arch')return missingStructure().length?0:2;
  if(bridgeType==='suspension'&&missingStructure().length)return 0;
  const base=bridgeType==='beam'?[1,0,1]:bridgeType==='truss'?[0,1,0]:[0,0,0];
  return base[bay]+bridgeTypes[bridgeType].parts.reduce((sum,part)=>sum+(selectedParts().has(part[0])?part[3][bay]:0),0);
}
function buildCost(){return bridgeTypes[bridgeType].cost+selectedParts().size;}
function firstWeakBay(){return [0,1,2].findIndex(bay=>support(bay)<loads[loadLevel].needs[bay]);}
function evaluateBridge(){
  const type=bridgeTypes[bridgeType],load=loads[loadLevel],weakBay=firstWeakBay(),incomplete=missingStructure();
  const tooShort=type.span<load.span,poorGround=type.needsRock&&load.banks!=='rocky',overBudget=buildCost()>load.budget;
  return {pass:!incomplete.length&&weakBay===-1&&!tooShort&&!poorGround&&!overBudget,weakBay,incomplete,tooShort,poorGround,overBudget};
}
function focusPart(id){lab.querySelector('.parts-kit [data-component="'+id+'"]')?.focus({preventScroll:true});}
function toggleComponent(id,fromDrop=false){
  if(testing||!bridgeTypes[bridgeType].parts.some(part=>part[0]===id))return;
  if(selectedParts().has(id))selectedParts().delete(id);
  else if(buildCost()>=loads[loadLevel].budget){notice='Your kit is full. Remove a piece before adding another.';renderBridge();focusPart(id);return;}
  else selectedParts().add(id);
  lastDrop=fromDrop?id:'';
  result=null;notice='';renderBridge();if(!fromDrop)focusPart(id);
}
function clearBridgeDesign(){if(testing)return;assembled[bridgeType]=new Set();result=null;notice='';renderBridge();}
function componentShape(id,geometry){
  const part=bridgeTypes[bridgeType].parts.find(part=>part[0]===id),on=selectedParts().has(id);
  return '<g class="bridge-component '+(on?'installed':'uninstalled')+(lastDrop===id?' just-built':'')+'" data-component="'+id+'" role="button" tabindex="'+(testing?-1:0)+'" aria-disabled="'+testing+'" aria-pressed="'+on+'" aria-label="'+(on?'Remove ':'Add ')+part[1]+'"><title>'+part[1]+'</title>'+geometry+'</g>';
}
function bridgeStructure(){
  let shapes='';
  if(bridgeType==='beam')shapes=[0,1,2].map(bay=>componentShape(['left-girder','center-girder','right-girder'][bay],'<rect x="'+(bay*200+6)+'" y="161" width="188" height="19" rx="5"/>')).join('');
  if(bridgeType==='truss'){
    shapes='<path class="frame" d="M0 140V35H600V140M200 35V140M400 35V140"/>';
    shapes+=[0,1,2].map(bay=>[0,1].map(direction=>componentShape('diagonal-'+bay+'-'+direction,'<path d="M'+(bay*200+(direction?0:200))+' 138L'+(bay*200+(direction?200:0))+' 38"/>')).join('')).join('');
    shapes+=[0,200,400,600].map(x=>'<circle class="joint" cx="'+x+'" cy="35" r="7"/><circle class="joint" cx="'+x+'" cy="140" r="7"/>').join('');
  }
  if(bridgeType==='arch')shapes=componentShape('left-arch','<path d="M10 247Q65 192 200 175"/>')+componentShape('keystone','<path d="M200 175Q300 152 400 175"/>')+componentShape('right-arch','<path d="M400 175Q535 192 590 247"/>')+componentShape('left-abutment','<rect x="-3" y="222" width="36" height="56" rx="3"/>')+componentShape('right-abutment','<rect x="567" y="222" width="36" height="56" rx="3"/>')+(missingStructure().length?'':'<path class="spandrels" d="M100 148V202M200 148V175M300 148V164M400 148V175M500 148V202"/>');
  if(bridgeType==='suspension')shapes=componentShape('left-tower','<path d="M70 249V12M-24 145L70 12"/>')+componentShape('right-tower','<path d="M530 249V12M624 145L530 12"/>')+componentShape('main-cable','<path d="M70 12Q300 150 530 12"/>')+[0,1,2].map(bay=>componentShape('hanger-'+bay,'<path d="M'+(100+bay*200)+' '+(bay===1?81:30)+'V140"/>')).join('');
  const weak=result&&!result.pass?result.weakBay:-1;
  return '<g transform="translate(180 139)" class="structure type-'+bridgeType+'"><path class="end-supports" d="M0 148V276M600 148V276"/>'+shapes+[0,1,2].map(bay=>'<g data-deck="'+bay+'" class="deck-section '+(bay===weak?'weak':'')+'"><rect class="road" x="'+(bay*200-1)+'" y="141" width="202" height="17" rx="2"/><path class="road-line" d="M'+(bay*200+12)+' 147H'+(bay*200+188)+'"/></g>').join('')+'</g>';
}
function vehicleArt(){
  if(loadLevel===1)return '<g><circle cx="0" cy="-61" r="12" fill="#bb7854"/><path d="M-6-48L-8-20M6-48L9-20" stroke="#e9ad2f" stroke-width="15" stroke-linecap="round"/><path d="M-5-20L-11-2M8-20L15-2" stroke="#273e54" stroke-width="7" stroke-linecap="round"/><rect x="-22" y="-48" width="13" height="24" rx="4" fill="#d75639"/><path d="M-11-70Q0-86 12-66" fill="#3c2b26"/></g>';
  if(loadLevel===2)return '<g><path d="M-36-35H20L30-4H-26Z" fill="#e9ad2f" stroke="#684f25" stroke-width="3"/><rect x="-27" y="-56" width="24" height="21" rx="3" fill="#bd7752"/><rect x="1" y="-48" width="16" height="13" fill="#638c54"/><path d="M-40-39L-55-56" stroke="#394b54" stroke-width="5"/><circle cx="-20" cy="-1" r="9" fill="#263b49"/><circle cx="24" cy="-1" r="9" fill="#263b49"/><circle cx="-20" cy="-1" r="4" fill="#b3c6ca"/><circle cx="24" cy="-1" r="4" fill="#b3c6ca"/></g>';
  return '<g><path d="M-47-47H18L42-23V-4H-47Z" fill="#f4b63e" stroke="#835928" stroke-width="3"/><path d="M18-40L34-24H18Z" fill="#bbdfeb"/><rect x="-38" y="-38" width="35" height="19" rx="3" fill="#ffedbb"/><path d="M-32-29H-10" stroke="#a77b39" stroke-width="3"/><circle cx="-28" cy="-1" r="11" fill="#263b49"/><circle cx="27" cy="-1" r="11" fill="#263b49"/><circle cx="-28" cy="-1" r="5" fill="#bbc8ca"/><circle cx="27" cy="-1" r="5" fill="#bbc8ca"/></g>';
}
function scene(){
  const load=loads[loadLevel];
  return '<svg class="bridge-scene" viewBox="0 0 960 460" role="group" aria-label="Build and test your bridge over the creek"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#c6e8ef"/><stop offset="1" stop-color="#edf5dd"/></linearGradient><linearGradient id="water" x2="0" y2="1"><stop stop-color="#6bb4b9"/><stop offset="1" stop-color="#2d819a"/></linearGradient><pattern id="ripples" width="90" height="30" patternUnits="userSpaceOnUse"><path d="M5 15q15 8 30 0t30 0" fill="none" stroke="#c1ebdf" stroke-width="2" opacity=".5"/></pattern></defs><rect width="960" height="460" fill="url(#sky)"/><circle cx="815" cy="67" r="32" fill="#f9dda0"/><g fill="#fff" opacity=".7"><path d="M70 76Q76 53 99 63Q120 41 145 69Q169 63 176 81H70Z"/><path d="M575 65Q583 48 601 57Q619 37 639 61Q666 50 673 72H575Z"/></g><path d="M0 232L86 155L147 206L246 103L370 221L491 151L626 235L746 133L866 226L960 161V310H0Z" fill="#b2cbb2"/><path d="M0 272Q146 183 315 261T618 252T960 230V325H0Z" fill="#769e7a"/><path d="M0 316Q215 264 429 309T960 294V460H0Z" fill="url(#water)"/><path d="M0 322Q215 272 429 318T960 303V460H0Z" fill="url(#ripples)"/><path d="M0 268H176L195 301L166 352L185 460H0Z" fill="#739253"/><path d="M960 268H784L765 303L797 351L780 460H960Z" fill="#739253"/><path d="M0 291H174L180 305L162 325H0ZM960 291H786L780 305L798 325H960Z" fill="#b3a38b"/><g fill="#587546"><path d="M65 160l-30 66h60Z"/><path d="M888 151l-32 75h64Z"/></g><g stroke="#775b3f" stroke-width="8"><path d="M65 215V270M888 215V270"/></g><g transform="translate(818 262)"><rect x="0" y="-9" width="89" height="6" rx="2" fill="#805f3f"/><path d="M5-6V28M83-6V28" stroke="#805f3f" stroke-width="4"/><text x="44" y="-20" text-anchor="middle" class="garden-label">Garden</text><g fill="#d68447"><path d="M15-10l4 13 5-13Z"/><path d="M52-10l4 13 5-13Z"/></g><path d="M19-10v-16M56-10v-16" stroke="#47774e" stroke-width="3"/><circle cx="72" cy="-28" r="8" fill="#f4c45d"/><path d="M72-21V-8" stroke="#47774e" stroke-width="3"/></g>'+bridgeStructure()+'<g id="crossing-load" transform="translate(124 280)" aria-label="'+load.name+'">'+vehicleArt()+'</g><g class="section-labels">'+[0,1,2].map(bay=>'<text x="'+(280+bay*200)+'" y="433" text-anchor="middle">'+bayNames[bay]+'</text>').join('')+'</g></svg>';
}
function nextHint(){
  if(result?.tooShort)return 'A beam is too short for this creek. Try the triangle truss.';
  if(result?.poorGround)return 'An arch pushes out into the banks. These soft banks cannot hold it.';
  const incomplete=missingStructure();if(incomplete.length)return 'Connect the structure first: add '+incomplete[0].toLowerCase()+'.';
  const weak=firstWeakBay();
  if(weak<0)return 'The bridge has enough support. Send the load across and see.';
  if(bridgeType==='beam')return 'The middle can bend. Add the middle boards beneath the road.';
  if(bridgeType==='truss')return 'Add a diagonal in the '+bayNames[weak].toLowerCase()+' section. It turns that square into triangles.';
  return 'Add the '+bayNames[weak].toLowerCase()+' hanging wire to connect the road to the cable.';
}
function statusMessage(){
  if(testing)return 'Crossing in progress… watch the bridge.';
  if(notice)return notice;
  if(result?.pass)return loadLevel===3?'All three crossings complete!':loads[loadLevel].short+' made it across!';
  if(result)return nextHint();
  return 'Drag a piece from your kit onto its dotted outline. Then send it across.';
}
function enablePieceDrag(button){
  let drag=null,suppressClick=false;
  button.addEventListener('click',event=>{
    if(suppressClick){event.preventDefault();suppressClick=false;return;}
    toggleComponent(button.dataset.component);
  });
  button.addEventListener('pointerdown',event=>{
    if(testing||event.button!==0||selectedParts().has(button.dataset.component))return;
    const id=button.dataset.component;
    drag={id,x:event.clientX,y:event.clientY,started:false,ghost:null,target:lab.querySelector('.bridge-scene [data-component="'+id+'"]')};
    button.setPointerCapture(event.pointerId);
  });
  button.addEventListener('pointermove',event=>{
    if(!drag)return;
    if(!drag.started&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<5)return;
    if(!drag.started){
      drag.started=true;
      drag.ghost=document.createElement('div');drag.ghost.className='dragged-piece';
      drag.ghost.innerHTML='<span>'+bridgeTypes[bridgeType].icon+'</span><b>'+button.textContent.replace(/^\s*\+\s*/,'')+'</b>';
      document.body.append(drag.ghost);
      drag.target.classList.add('drop-target');lab.querySelector('.bridge-scene').classList.add('placing-piece');
      button.classList.add('piece-picked-up');
      lab.querySelector('.crossing-status').textContent='Drop it on the gold outline.';
    }
    event.preventDefault();
    drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';
    const rect=drag.target.getBoundingClientRect();
    const inside=event.clientX>=rect.left-20&&event.clientX<=rect.right+20&&event.clientY>=rect.top-22&&event.clientY<=rect.bottom+22;
    drag.ghost.classList.toggle('can-drop',inside);drag.target.classList.toggle('drop-ready',inside);
  });
  function finish(event,cancelled=false){
    if(!drag)return;
    const held=drag;drag=null;
    if(!held.started)return;
    suppressClick=true;
    held.ghost.remove();held.target.classList.remove('drop-target','drop-ready');
    lab.querySelector('.bridge-scene')?.classList.remove('placing-piece');button.classList.remove('piece-picked-up');
    const rect=held.target.getBoundingClientRect();
    const fits=!cancelled&&event.clientX>=rect.left-20&&event.clientX<=rect.right+20&&event.clientY>=rect.top-22&&event.clientY<=rect.bottom+22;
    if(fits)toggleComponent(held.id,true);
    else lab.querySelector('.crossing-status').textContent=cancelled?statusMessage():'Try again: drag the piece onto its matching dotted outline.';
  }
  button.addEventListener('pointerup',event=>finish(event));
  button.addEventListener('pointercancel',event=>finish(event,true));
}
function testBridge(){
  if(testing)return;
  testing=true;result=null;notice='';showHint=false;testsRun++;
  const outcome=evaluateBridge(),token=++animationId;
  renderBridge();
  const load=lab.querySelector('#crossing-load'),svg=lab.querySelector('.bridge-scene');
  const weak=outcome.weakBay>=0?outcome.weakBay:1;
  const stop=outcome.pass?839:280+weak*200;
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?250:2600;
  let start;
  function frame(now){
    if(token!==animationId)return;
    start??=now;
    const progress=Math.min(1,(now-start)/duration);
    const x=124+(stop-124)*progress;
    const bay=Math.min(2,Math.max(0,Math.floor((x-180)/200)));
    svg.querySelectorAll('[data-deck]').forEach(deck=>{
      const index=Number(deck.dataset.deck),ratio=support(index)/loads[loadLevel].needs[index];
      deck.classList.toggle('under-load',index===bay&&x>180&&x<780);
      deck.classList.toggle('strained',index===bay&&ratio<1&&x>180);
      if(index===bay&&ratio<1&&x>180){
        const dip=outcome.pass?0:Math.max(0,(progress-.35))*16;
        deck.setAttribute('transform','translate(0 '+dip+')');
      }
    });
    const falling=!outcome.pass&&progress>.86?(progress-.86)*150:0;
    load.setAttribute('transform','translate('+x+' '+(280+falling)+')'+(falling?' rotate('+falling*.45+')':''));
    if(progress<1)requestAnimationFrame(frame);
    else{
      testing=false;result=outcome;
      if(outcome.pass&&loadLevel===3)saveBridge();
      // Keep the tested scene in place: no win screen hiding the crossing.
      lab.querySelector('.crossing-status').className='crossing-status '+(outcome.pass?'success':'failure');
      lab.querySelector('.crossing-status').textContent=statusMessage();
      lab.querySelectorAll('button').forEach(button=>button.disabled=false);
      lab.querySelectorAll('.bridge-component').forEach(part=>{part.setAttribute('aria-disabled','false');part.setAttribute('tabindex','0');});
      lab.querySelector('#test-bridge').textContent='Test again';
      lab.querySelector('.result-actions').innerHTML=resultActions();
      bindResultActions();
      lab.querySelector('.attempt-count').textContent=testsRun+' test'+(testsRun===1?'':'s');
      if(!outcome.pass)lab.querySelector('[data-deck="'+weak+'"]')?.classList.add('broken');
    }
  }
  requestAnimationFrame(frame);
}
function saveBridge(){try{const key='engineer-quest-learning-v2';const saved=JSON.parse(localStorage.getItem(key)||'[]');localStorage.setItem(key,JSON.stringify([...new Set([...(Array.isArray(saved)?saved:[]),'bridge'])]));}catch{}}
function resetBridge(){animationId++;testing=false;assembled={beam:new Set(),truss:new Set(),arch:new Set(),suspension:new Set()};bridgeType='beam';loadLevel=1;testsRun=0;result=null;showHint=false;notice='';renderBridge();}
function nextBridgeLevel(){if(testing||!result?.pass||loadLevel>=3)return;loadLevel++;assembled={beam:new Set(),truss:new Set(),arch:new Set(),suspension:new Set()};bridgeType=loadLevel===2?'truss':'arch';result=null;showHint=false;notice='';renderBridge();}
function resultActions(){
  if(!result?.pass)return '';
  return '<p>'+briefLessons[bridgeType]+'</p><button class="next-crossing" id="'+(loadLevel===3?'build-again':'next-level')+'">'+(loadLevel===3?'Play again ↻':'Next crossing →')+'</button>';
}
function bindResultActions(){lab.querySelector('#next-level')?.addEventListener('click',nextBridgeLevel);lab.querySelector('#build-again')?.addEventListener('click',resetBridge);}
function renderBridge(){
  const load=loads[loadLevel],budget=buildCost(),titles=['The first crossing','Across the wider creek','The garden delivery'];
  const unlocked=loadLevel===1?['beam']:loadLevel===2?['beam','truss']:Object.keys(bridgeTypes);
  lab.innerHTML='<section class="bridge-game"><header class="game-heading"><div><span class="game-label">Civil engineering · build, test, improve</span><h1>Bridge Builder</h1></div><nav class="crossing-levels" aria-label="Crossings">'+[1,2,3].map(i=>'<span class="'+(i===loadLevel?'current':i<loadLevel?'complete':'')+'" aria-label="Crossing '+i+(i===loadLevel?', current':'')+'">'+(i<loadLevel?'✓':i)+'</span>').join('')+'</nav></header><div class="mission-brief"><div><h2>'+titles[loadLevel-1]+'</h2><p>'+['Get Maya and her backpack to the garden.','Help the supply cart reach the garden.','Build a bridge strong enough for the delivery van.'][loadLevel-1]+'</p></div><div class="mission-rules"><span><b>'+load.icon+' '+load.short+'</b>Load to carry</span><span><b>'+['Short creek','Wider creek','Wide creek'][loadLevel-1]+'</b>'+ (load.banks==='rocky'?'Rocky banks':'Soft banks')+'</span><span><b>'+load.budget+' pieces</b>Your building kit</span></div></div><div class="game-workspace"><div class="play-area"><div class="scene-topline"><span>'+friendlyNames[bridgeType]+'</span><span class="attempt-count">'+testsRun+' test'+(testsRun===1?'':'s')+'</span></div>'+scene()+'<div class="crossing-status '+(testing?'testing':result?.pass?'success':result?'failure':'')+'" role="status" aria-live="polite">'+statusMessage()+'</div><div class="result-actions">'+resultActions()+'</div><div class="support-readout" aria-label="Section support">'+[0,1,2].map(bay=>'<div><span>'+bayNames[bay]+'</span><div class="support-track"><i style="width:'+Math.min(100,support(bay)/load.needs[bay]*100)+'%"></i></div><small>'+support(bay)+' / '+load.needs[bay]+' support</small></div>').join('')+'</div></div><aside class="bridge-kit"><div class="kit-heading"><h2>Your bridge kit</h2><span class="kit-count">'+budget+' / '+load.budget+'</span></div><div class="kit-budget"><i style="width:'+budget/load.budget*100+'%"></i></div>'+ (unlocked.length>1?'<div class="type-picker" role="group" aria-label="Bridge design">'+unlocked.map(key=>'<button data-type="'+key+'" aria-pressed="'+(bridgeType===key)+'" '+(testing?'disabled':'')+'><span>'+bridgeTypes[key].icon+'</span>'+friendlyNames[key]+'</button>').join('')+'</div>':'<p class="kit-intro">Add boards below the road. You can remove any piece and try again.</p>')+'<div class="parts-kit">'+bridgeTypes[bridgeType].parts.map(part=>'<button type="button" draggable="'+!testing+'" data-component="'+part[0]+'" aria-pressed="'+selectedParts().has(part[0])+'" '+(testing?'disabled':'')+'><span>'+ (selectedParts().has(part[0])?'✓':'+')+'</span>'+part[1]+'</button>').join('')+'</div><p class="kit-note">Each piece uses one slot. The base bridge uses '+bridgeTypes[bridgeType].cost+'.</p><button class="test-crossing" id="test-bridge" '+(testing?'disabled':'')+'>'+ (testing?'Crossing…':result?'Test again':'Send it across →')+'</button><div class="kit-secondary"><button id="reset-bridge" '+(testing?'disabled':'')+'>Clear</button><button id="bridge-hint" aria-expanded="'+showHint+'" '+(testing?'disabled':'')+'>Need a hint?</button></div>'+(showHint?'<p class="bridge-hint">'+nextHint()+'</p>':'')+'</aside></div><details class="bridge-explanation"><summary>How this bridge works</summary><p>'+bridgeTypes[bridgeType].lesson+'</p><p>Each section needs the support shown below the scene. This is a simplified learning model: real bridges also depend on materials, joints, foundations, and safety factors.</p>'+(typeof missionMajorPanel==='function'?missionMajorPanel('bridge'):'')+'</details></section>';
  lab.querySelectorAll('[data-component]').forEach(element=>{
    if(element.tagName.toLowerCase()==='g'){
      element.addEventListener('click',()=>toggleComponent(element.dataset.component));
      element.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleComponent(element.dataset.component);}});
    }else{element.draggable=false;enablePieceDrag(element);}
  });
  lab.querySelectorAll('[data-type]').forEach(button=>button.addEventListener('click',()=>{if(testing)return;bridgeType=button.dataset.type;result=null;notice='';renderBridge();lab.querySelector('[data-type="'+bridgeType+'"]')?.focus({preventScroll:true});}));
  lab.querySelector('#test-bridge').addEventListener('click',testBridge);
  lab.querySelector('#reset-bridge').addEventListener('click',clearBridgeDesign);
  lab.querySelector('#bridge-hint').addEventListener('click',()=>{if(testing)return;showHint=!showHint;renderBridge();lab.querySelector('#bridge-hint').focus({preventScroll:true});});
  bindResultActions();
}
renderBridge();
