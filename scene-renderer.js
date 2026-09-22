// Canvas diagrams share one blueprint language across all eight missions.
function sceneLine(ctx, points, color = '#72e5dd', width = 3, dash = []) {
  ctx.beginPath(); ctx.setLineDash(dash); ctx.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(); ctx.setLineDash([]);
}
function sceneCircle(ctx, x, y, radius, fill, stroke = '', width = 2) {
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}
function sceneBox(ctx, x, y, width, height, fill, stroke = '', lineWidth = 2) {
  ctx.fillStyle = fill; ctx.fillRect(x, y, width, height);
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.strokeRect(x, y, width, height); }
}
function sceneText(ctx, text, x, y, color = '#dffaf7') {
  ctx.fillStyle = color; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(text, x, y);
}
function sceneGear(ctx, x, y, radius, rotation) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 32; i++) {
    const angle = i * Math.PI / 16, r = i % 2 ? radius * .83 : radius;
    const px = Math.cos(angle) * r, py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath(); ctx.fillStyle = '#133753'; ctx.fill(); ctx.strokeStyle = '#72e5dd'; ctx.lineWidth = 3; ctx.stroke();
  sceneCircle(ctx, 0, 0, radius * .42, '#0e233d', '#72e5dd', 3);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2;
    sceneLine(ctx, [[Math.cos(a) * radius * .43, Math.sin(a) * radius * .43], [Math.cos(a) * radius * .7, Math.sin(a) * radius * .7]], '#72e5dd', 5);
  }
  ctx.restore();
}
function drawScene(ctx, id, step, outcome, resultText, phase, lab = {}) {
  ctx.clearRect(0, 0, 640, 390);
  const background = ctx.createLinearGradient(0, 0, 640, 390);
  background.addColorStop(0, '#102944'); background.addColorStop(.55, '#0d2340'); background.addColorStop(1, '#102c46');
  ctx.fillStyle = background; ctx.fillRect(0, 0, 640, 390);
  ctx.strokeStyle = '#4e8ca022'; ctx.lineWidth = 1;
  for (let x = 0; x <= 640; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 390); ctx.stroke(); }
  for (let y = 0; y <= 390; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke(); }
  ctx.strokeStyle = '#85d9df21'; ctx.strokeRect(26, 24, 588, 342);
  const move = Math.sin(phase * 1.8);

  if (id === 'civil') {
    sceneBox(ctx, 0, 267, 640, 123, '#14466c');
    for (let i = 0; i < 5; i++) sceneLine(ctx, [[20, 284 + i * 19], [160, 280 + i * 19 + move * 3], [300, 284 + i * 19], [470, 280 + i * 19 - move * 3], [620, 284 + i * 19]], '#4daacb88', 2);
    sceneBox(ctx, 72, 191, 496, 18, '#f5c56e', '#f5d489', 2);
    sceneLine(ctx, [[90, 211], [145, 263], [204, 211], [265, 263], [325, 211], [385, 263], [446, 211], [505, 263], [550, 211]], lab.brace ? '#72e5dd' : '#72e5dd50', lab.brace ? 5 : 3, lab.brace ? [] : [7, 7]);
    sceneLine(ctx, [[90, 262], [550, 262]], '#72e5dd', 4);
    sceneLine(ctx, [[72, 180], [568, 180]], '#8fb8c9', 2);
    for (const x of [90, 204, 325, 446, 550]) sceneCircle(ctx, x, 211, 5, '#f5c56e');
    const vehicleX = lab.cart ? 138 + ((phase * 45) % 330 + 330) % 330 : 100;
    sceneBox(ctx, vehicleX, 166, 46, 20, '#8ce0d7'); sceneCircle(ctx, vehicleX + 9, 190, 6, '#0a1c32', '#f5c56e'); sceneCircle(ctx, vehicleX + 36, 190, 6, '#0a1c32', '#f5c56e');
    if (lab.drain) { sceneLine(ctx, [[525, 245], [580, 275], [610, 300]], '#f5c56e', 5); sceneCircle(ctx, 591, 289, 4, '#f5c56e'); }
  } else if (id === 'mechanical') {
    sceneGear(ctx, 158, 214, 55, lab.gears ? phase * .35 : 0); sceneGear(ctx, 282, 214, 69, lab.gears ? -phase * .3 : 0); sceneGear(ctx, 445, 214, 94, lab.gears && !lab.brake ? phase * .22 : 0);
    sceneLine(ctx, [[78, 315], [555, 315]], '#4d8ca3', 3);
    sceneCircle(ctx, 158, 315, 6, '#f5c56e'); sceneCircle(ctx, 445, 315, 6, '#f5c56e');
    sceneLine(ctx, [[158, 280], [158, 315]], '#4d8ca3', 2); sceneLine(ctx, [[445, 307], [445, 315]], '#4d8ca3', 2);
    sceneBox(ctx, 530, lab.curtain ? 123 : 166, 48, lab.curtain ? 12 : 80, '#f5c56e88', '#f5c56e', 2);
    if (lab.brake) sceneLine(ctx, [[460, 296], [495, 274]], '#f5c56e', 7);
  } else if (id === 'electrical') {
    sceneBox(ctx, 69, 181, 86, 88, '#153e58', '#72e5dd', 3);
    sceneBox(ctx, 103, 173, 20, 8, '#f5c56e');
    sceneLine(ctx, [[155, 226], [198, 226], [198, 145], [545, 145], [545, 226]], '#72e5dd', 4);
    sceneLine(ctx, [[545, 226], [545, 305], [198, 305], [198, 226]], '#72e5dd', 4);
    for (const [i, x] of [265, 390, 515].entries()) {
      sceneLine(ctx, [[x, 145], [x, 199]], '#72e5dd', 3);
      const on = lab[['gate', 'path', 'story'][i]];
      sceneCircle(ctx, x, 220, 28, on ? '#f7d38044' : '#17374a', on ? '#f7d380' : '#669aaa', 3);
      sceneCircle(ctx, x, 220, 8, on ? '#fff2b5' : '#40647b');
      sceneLine(ctx, [[x, 241], [x, 305]], '#72e5dd', 3);
    }
    sceneCircle(ctx, 198 + (Math.sin(phase * 2) + 1) * 165, 145, 7, '#fff1a6');
  } else if (id === 'software') {
    for (let x = 108; x <= 532; x += 106) sceneLine(ctx, [[x, 112], [x, 318]], '#49869b', 2);
    for (let y = 112; y <= 320; y += 52) sceneLine(ctx, [[108, y], [532, y]], '#49869b', 2);
    sceneLine(ctx, [[320, 268], [320, 216], [214, 216]], '#72e5dd', 8);
    sceneLine(ctx, [[320, 215], [426, 215]], '#f5c56e', 5, [9, 8]);
    sceneCircle(ctx, 214, 215, 27, '#1f5666', '#72e5dd', 3); sceneCircle(ctx, 426, 215, 27, '#745b3a', '#f5c56e', 3);
    sceneText(ctx, 'BLUE HOUSE', 214, 260); sceneText(ctx, 'RED HOUSE', 426, 260, '#ffe5af'); sceneText(ctx, 'POST OFFICE', 320, 310);
    const robotX = 108 + (lab.x ?? 2) * 106, robotY = 112 + (lab.y ?? 3) * 52;
    sceneBox(ctx, robotX - 17, robotY - 17, 34, 34, '#72e5dd', '#d8fff9', 2); sceneCircle(ctx, robotX - 7, robotY - 4, 3, '#0d2340'); sceneCircle(ctx, robotX + 7, robotY - 4, 3, '#0d2340');
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]], facing = directions[lab.dir ?? 0];
    sceneLine(ctx, [[robotX, robotY + 4], [robotX + facing[0] * 28, robotY + 4 + facing[1] * 28]], '#fff1a6', 5);
    sceneLine(ctx, [[robotX, robotY - 17], [robotX, robotY - 26]], '#72e5dd', 2); sceneCircle(ctx, robotX, robotY - 28, 4, '#f5c56e');
    if (lab.delivered >= 1) sceneCircle(ctx, 214, 215, 9, '#f5c56e');
    if (lab.delivered >= 2) sceneCircle(ctx, 426, 215, 9, '#f5c56e');
  } else if (id === 'environmental') {
    sceneBox(ctx, 0, 280, 640, 110, '#174969');
    sceneLine(ctx, [[0, 275], [140, 259], [260, 276], [386, 257], [520, 274], [640, 262]], '#5dc0d3', 4);
    sceneLine(ctx, [[125, 128], [180, 198], [235, 250]], '#f2c979', 4, [9, 8]);
    sceneBox(ctx, 244, 227, 116, 30, lab.garden ? '#557a60' : '#5b574a', lab.garden ? '#83c6a3' : '#a79a78', 2);
    if (lab.plants) for (const x of [260, 284, 309, 335]) { sceneLine(ctx, [[x, 228], [x, 183]], '#88d7a7', 3); sceneLine(ctx, [[x, 209], [x - 12, 194]], '#88d7a7', 2); sceneLine(ctx, [[x, 202], [x + 11, 187]], '#88d7a7', 2); }
    for (const x of [420, 462, 505]) sceneCircle(ctx, x + Math.sin(phase + x) * 6, 298, 6, '#f5c56e');
    sceneLine(ctx, [[386, 185], [430, 234], [474, 199]], '#72e5dd', 3);
    if (lab.recycle) { sceneBox(ctx, 493, 190, 40, 48, '#379a91', '#a2eadd', 3); sceneLine(ctx, [[500, 202], [526, 202]], '#b9f8ea', 3); }
  } else if (id === 'biomedical') {
    ctx.save(); ctx.translate(316, 222); ctx.rotate(-.56);
    sceneBox(ctx, -146, -18, 265, 36, '#d6e8e2', '#72e5dd', 3);
    sceneBox(ctx, lab.sleeve ? -110 : -80, -27 - (lab.grip || 0) * 3, 120, 54 + (lab.grip || 0) * 6, '#468f92', '#a9ebe5', 3);
    for (const x of [-63, -40, -17, 6, 29]) sceneLine(ctx, [[x, -23], [x, 23]], '#c4f1e6', 2);
    sceneLine(ctx, [[119, -13], [160, 0], [119, 13]], '#f5c56e', 3);
    ctx.restore();
    sceneLine(ctx, [[388, 289], [448, 269], [505, 282], [548, 260]], '#f5c56e', 6);
    for (let i = 0; i < (lab.dots || 0); i++) sceneCircle(ctx, 425 + (i % 4) * 31, 206 + Math.floor(i / 4) * 29, 5, '#f5c56e');
  } else if (id === 'materials') {
    const jacket = [[238, 119], [285, 104], [320, 123], [355, 104], [402, 119], [470, 180], [431, 220], [397, 190], [397, 312], [243, 312], [243, 190], [209, 220], [170, 180]];
    ctx.beginPath(); ctx.moveTo(jacket[0][0], jacket[0][1]); for (const p of jacket.slice(1)) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fillStyle = '#1c5062'; ctx.fill(); ctx.strokeStyle = '#72e5dd'; ctx.lineWidth = 4; ctx.stroke();
    sceneLine(ctx, [[320, 123], [320, 310]], lab.seams ? '#f5c56e' : '#f5c56e77', lab.seams ? 5 : 2, lab.seams ? [] : [7, 7]); sceneLine(ctx, [[243, 187], [243, 309], [397, 309], [397, 187]], '#83b8c3', 2);
    if (lab.elbows) { sceneCircle(ctx, 205, 211, 20, '#72e5dd33', '#72e5dd', 3); sceneCircle(ctx, 435, 211, 20, '#72e5dd33', '#72e5dd', 3); }
    if (lab.rain) for (const x of [157, 203, 436, 487]) { const y = 124 + ((phase * 30 + x) % 80); sceneLine(ctx, [[x, y], [x - 9, y + 26]], '#66aaca', 3); }
  } else if (id === 'aerospace') {
    ctx.beginPath(); ctx.ellipse(501, 264, 56, 25, 0, 0, Math.PI * 2); ctx.strokeStyle = '#f5c56e'; ctx.lineWidth = 4; ctx.stroke();
    sceneCircle(ctx, 501, 264, 13, '#f5c56e44', '#f5c56e', 3);
    const landingX = 501 + ((lab.aim || 0) + 1) * 55;
    ctx.beginPath(); ctx.moveTo(85, 265); ctx.quadraticCurveTo(300, 70, landingX, 264); ctx.setLineDash([11, 9]); ctx.strokeStyle = '#72e5dd'; ctx.lineWidth = 3; ctx.stroke(); ctx.setLineDash([]);
    const flight = lab.launches ? Math.max(0, Math.min(1, (phase * 1000 - lab.actionAt) / 1800)) : 0;
    const remaining = 1 - flight;
    const x = remaining * remaining * 85 + 2 * remaining * flight * 300 + flight * flight * landingX;
    const y = remaining * remaining * 265 + 2 * remaining * flight * 70 + flight * flight * 264;
    ctx.save(); ctx.translate(x, y); ctx.rotate(lab.launches ? Math.atan2(remaining * (70 - 265) + flight * (264 - 70), remaining * (300 - 85) + flight * (landingX - 300)) : -.23);
    ctx.beginPath(); ctx.moveTo(24, 0); ctx.lineTo(-20, 13); ctx.lineTo(-6, 0); ctx.lineTo(-20, -13); ctx.closePath(); ctx.fillStyle = '#d6f4ef'; ctx.fill(); ctx.strokeStyle = '#72e5dd'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    for (const yWind of [132, 165, 198]) { sceneLine(ctx, [[445, yWind], [515, yWind]], '#668eae', 2); sceneLine(ctx, [[505, yWind - 7], [515, yWind], [505, yWind + 7]], '#668eae', 2); }
    if (lab.launches && flight >= 1) sceneCircle(ctx, landingX, 264, 7, '#72e5dd');
  }
  // A small pulse shows that the scene is running without pretending every choice changes a physical part.
  sceneCircle(ctx, 568, 325, 7 + (Math.sin(phase * 2) + 1) * 2, outcome === 'ready' ? '#8ce5b8' : outcome === 'revise' ? '#f5c56e' : '#72e5dd');
}
